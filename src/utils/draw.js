// Draws a particle on the canvas.
export const drawParticle = (ctx, x, y, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);

  ctx.fillStyle = color;
  ctx.fill();
};
