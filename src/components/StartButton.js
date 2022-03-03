import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const StartButton = ({ simulation, running, probability, requestId }) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (!running.current) {
      running.current = true;

      buttonRef.current.textContent = 'Pause';
      buttonRef.current.style.backgroundColor = '#f78080';

      requestId.current = window.requestAnimationFrame(() => {
        simulation.current.randomWalk({ running, probability, requestId });
      });
    } else {
      window.cancelAnimationFrame(requestId.current);
      running.current = false;

      buttonRef.current.textContent = 'Resume';
      buttonRef.current.style.backgroundColor = '#1bdf7d';
    }
  };

  return (
    <button
      id="StartButton"
      ref={buttonRef}
      style={{ backgroundColor: '#1bdf7d' }}
      onClick={handleClick}
    >
      Start
    </button>
  );
};

StartButton.propTypes = {
  running: PropTypes.object,
  simulation: PropTypes.object,
  probability: PropTypes.object,
  requestId: PropTypes.object,
};

export default StartButton;
