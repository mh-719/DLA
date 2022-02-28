// Returns a uniformly distributed random number on the interval [min, max).
export const random = (min, max) => {
  const diff = max - min;
  return (Math.random() * diff) + min;
};

// Tolerance for comparing floating-point numbers.
export const EPSILON = 0.00001;
