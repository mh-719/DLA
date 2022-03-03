import React, { useRef, useEffect } from 'react';
import '../styles/Canvas.css';

const resizeCanvas = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const ratio = window.devicePixelRatio;
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
  }
};

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas(canvas);

    const resetButton = document.getElementById('ResetButton');
    resetButton.click();
  }, []);

  return <canvas id="Canvas" ref={canvasRef} />;
};

export default Canvas;
