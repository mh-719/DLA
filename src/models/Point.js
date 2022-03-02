import { quadtree } from 'd3-quadtree';
import Particle from './Particle';
import { drawParticle } from '../utils/draw';
import { random } from '../utils/math';
import { nearest } from '../utils/nearest';
import { disableStart } from '../utils/disableStart';

// Models the DLA process for a system with a point attractor.
class Point {
  constructor({ context2D, width, height, particle }) {
    this.ctx = context2D;
    this.center = [width / 2, height / 2];
    this.dimensions = [width, height];

    this.tree = quadtree();
    this.particle = particle;

    const { radius } = particle;
    this.r0 = radius;
    this.clusterRadius = radius;
    this.k = 4;
    this.edgeRadius = radius + (this.k * radius);
  }

  // Draws the given particle with the x-coordinate translated by half the
  // canvas width and the y-coordinate translated by half the canvas height.
  draw(p) {
    const [cx, cy] = this.center;
    const [px, py] = [p.x + cx, p.y + cy];
    drawParticle(this.ctx, px, py, p.r, this.particle.color);
  }

  // Clears the canvas and draws the seed particle.
  init() {
    const [w, h] = this.dimensions;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, w, h);

    const seed = new Particle(0, 0, this.particle.radius);
    this.tree.add([0, 0, seed]);
    this.draw(seed);
  }

  // Returns a particle at a random position relatively close to the cluster.
  randomPosition() {
    const dr = this.k * this.particle.radius;

    const min = Math.max(this.clusterRadius - dr, this.particle.radius);
    const max = this.clusterRadius + dr;

    const r = random(min, max);
    const theta = random(0, 2 * Math.PI);

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    return new Particle(x, y, this.particle.radius);
  }

  // Returns true if the given particle should stick to the cluster.
  shouldStick(p, stickiness) {
    const n = nearest(this.tree, p);
    if (p.isIntersecting(n)) return false;

    return random(0, 1) < stickiness;
  }

  // Increases the particle radius based on distance from the origin.
  increaseSize(distance) {
    const maxDistance = Math.max(...this.center);
    const frac = distance / maxDistance;
    this.particle.radius = (frac * 5) + 0.5;
  }

  // Decreases the particle radius based on distance from the origin.
  decreaseSize(distance) {
    const maxDistance = Math.max(...this.center);
    const frac = 1 - (distance / maxDistance);
    const r = frac * this.r0;
    this.particle.radius = (r < 1) ? 1 : r;
  }

  // Returns true if the given particle extends past the canvas.
  isOutOfBounds(p) {
    const [cx, cy] = this.center;
    const [px, py] = [p.x + cx, p.y + cy];
    const r = this.particle.radius;
    const [w, h] = this.dimensions;

    return (px - r < 0) || (px + r > w) || (py - r < 0) || (py + r > h);
  }

  // Updates the model with the newest particle added to the cluster.
  update(p, running) {
    const distance = p.length();

    // Check if the newest particle is the farthest from the origin.
    if (distance > this.clusterRadius) {
      this.clusterRadius = distance;

      // Check if particle size varies with distance from the origin.
      if (this.particle.size === 'increasing') {
        this.increaseSize(distance);
      } else if (this.particle.size === 'decreasing') {
        this.decreaseSize(distance);
      }

      const dr = this.k * this.particle.radius;
      this.edgeRadius = this.clusterRadius + dr;
    }

    // Check if the cluster has grown past the canvas.
    if (this.isOutOfBounds(p)) {
      running.current = false;
      disableStart();
    }
  }

  // Diffuses a new particle.
  randomWalk({ running, probability, requestId }) {
    let p = this.randomPosition();
    let stickAttempts = 0;

    // Particle goes on a random walk.
    while (running.current) {
      // Find the nearest cluster particle.
      const n = nearest(this.tree, p);

      // Particle sticks to the nearest cluster particle if close enough.
      if (p.isCloseTo(n)) {
        p.sticksTo(n);

        // Particle is pushed away if the new position is not accepted.
        if (!this.shouldStick(p, probability.current)) {
          p.repelledBy(n);
          stickAttempts += 1;

          // Position is reset if particle fails to stick too many times.
          if (stickAttempts > 15) {
            p = this.randomPosition();
            stickAttempts = 0;
          }

          continue;
        }
      }
      // Particle moves randomly.
      else {
        p.move();

        // Position is reset if particle moves too far from the cluster.
        if (p.length() > this.edgeRadius) {
          p = this.randomPosition();
          stickAttempts = 0;
        }

        continue;
      }

      // Particle is added to the cluster.
      this.tree.add([p.x, p.y, p]);
      this.draw(p);
      this.update(p, running);

      // Random walk ends.
      break;
    }

    // Check if the DLA simulation is still running.
    if (running.current) {
      // A new particle goes on a random walk.
      requestId.current = window.requestAnimationFrame(() => {
        this.randomWalk({ running, probability, requestId });
      });
    }
  }
}

export default Point;
