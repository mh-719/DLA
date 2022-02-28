import Vector from './Vector';
import { random, EPSILON } from '../utils/math';

// Models a particle undergoing a 2D random walk.
class Particle extends Vector {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  // Moves this particle a distance of half the radius in a random direction.
  move() {
    const theta = random(0, 2 * Math.PI);

    const dx = 0.5 * this.r * Math.cos(theta);
    const dy = 0.5 * this.r * Math.sin(theta);

    this.x += dx;
    this.y += dy;
  }

  // Returns true if this particle is close enough to the given particle to stick to it.
  isCloseTo(p) {
    if (!p) return false;

    const dist = Particle.distance(this, p);
    const sigma = (this.r + p.r) / (2 ** (1 / 6));
    const attractionDist = 1.5 * sigma;

    return dist < attractionDist + EPSILON;
  }

  // Moves this particle to a position adjacent to the given particle.
  // Call this method only if the two particles are close enough to stick.
  sticksTo(p) {
    const unitVec = this.minus(p).normalize();
    const scaledVec = unitVec.scale(this.r + p.r);
    const sum = p.plus(scaledVec);

    this.x = sum.x;
    this.y = sum.y;
  }

  // Moves this particle far enough to not be attracted to the given particle.
  repelledBy(p) {
    const unitVec = this.minus(p).normalize();
    const sigma = (this.r + p.r) / (2 ** (1 / 6));
    const attractionDist = 1.5 * sigma;
    const scaledVec = unitVec.scale(attractionDist + (0.5 * this.r));
    const sum = p.plus(scaledVec);

    this.x = sum.x;
    this.y = sum.y;
  }

  // Returns true if this particle intersects the given particle.
  isIntersecting(p) {
    if (!p) return false;

    const dist = Particle.distance(this, p);
    const bondLength = this.r + p.r;

    return dist < bondLength - EPSILON;
  }
}

export default Particle;
