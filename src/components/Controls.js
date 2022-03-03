import React, { useRef } from 'react';
import StartButton from './StartButton';
import ResetButton from './ResetButton';
import { attractorTypes, particleSizes } from '../models/options';
import '../styles/Controls.css';

const Controls = () => {
  const attractor = useRef(attractorTypes[0].item);
  const particle = useRef(particleSizes[0].item);

  const simulation = useRef(null);
  const running = useRef(false);
  const probability = useRef(1);
  const requestId = useRef(null);

  return (
    <React.Fragment>
      <div className="controls row-1">
        <div className="start-reset">
          <StartButton
            simulation={simulation}
            running={running}
            probability={probability}
            requestId={requestId}
          />
          <ResetButton
            simulation={simulation}
            requestId={requestId}
            running={running}
            particle={particle}
            attractor={attractor}
          />
        </div>
      </div>
      <div className="controls row-2"></div>
    </React.Fragment>
  );
};

export default Controls;
