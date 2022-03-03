import React from 'react';
import Title from './Title';
import Canvas from './Canvas';
import Controls from './Controls';

function GUI() {
  return (
    <React.Fragment>
      <Title />
      <Canvas />
      <Controls />
    </React.Fragment>
  );
}

export default GUI;
