// Models a position vector in 2D space.
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Returns the magnitude.
  length() {
    return Math.hypot(this.x, this.y);
  }

  // Returns the result of adding the given vector to this vector.
  plus(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  // Returns the result of subtracting the given vector from this vector.
  minus(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  // Returns the result of multiplying this vector by the given scalar.
  scale(k) {
    return new Vector(this.x * k, this.y * k);
  }

  // Returns the unit vector.
  normalize() {
    const k = 1 / this.length();
    return this.scale(k);
  }

  // Returns the distance between two specified vectors.
  static distance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.hypot(dx, dy);
  }
}

export default Vector;
