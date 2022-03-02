// Returns the particle in the given quadtree closest in position to the
// given particle. If the given quadtree is empty, returns undefined.
export const nearest = (quadtree, p) => {
  const node = quadtree.find(p.x, p.y);
  return node ? node[2] : undefined;
};
