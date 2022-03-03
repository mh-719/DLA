import React from 'react';
import { defaultColor } from '../utils/color';
import PropTypes from 'prop-types';

const enableStart = () => {
  const startButton = document.getElementById('StartButton');
  startButton.disabled = false;
  startButton.textContent = 'Start';
  startButton.style.backgroundColor = '#1bdf7d';
};

const ResetButton = ({ simulation, requestId, running, particle, attractor }) => {
  const handleClick = () => {
    window.cancelAnimationFrame(requestId.current);
    running.current = false;
    enableStart();

    const canvas = document.getElementById('Canvas');
    const { width, height } = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const args = {
      context2D: ctx,
      width,
      height,
      particle: {
        ...particle.current,
        color: defaultColor,
      },
    };

    const model = new attractor.current.model(args);
    simulation.current = model;
    model.init();
  };

  return (
    <button id="ResetButton" onClick={handleClick}>
      Reset
    </button>
  );
};

ResetButton.propTypes = {
  simulation: PropTypes.object,
  requestId: PropTypes.object,
  running: PropTypes.object,
  particle: PropTypes.object,
  attractor: PropTypes.object,
};

export default ResetButton;
