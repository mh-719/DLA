import React, { useRef } from 'react';
import DropDown from './DropDown';
import StartButton from './StartButton';
import ResetButton from './ResetButton';
import Slider from './Slider';
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
        <DropDown
          width={140}
          options={attractorTypes}
          selection={attractor}
          label="Attractor Type"
        />
        <DropDown
          width={130}
          options={particleSizes}
          selection={particle}
          label="Particle Size"
        />
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
      <div className="controls row-2">
        <Slider probability={probability} />
      </div>
    </React.Fragment>
  );
};

export default Controls;
