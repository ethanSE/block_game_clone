import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Box from './Box'
import './App.css';

function App() {

  const [boxes, setBoxes] = useState([1, 2, 3])

  return (
    <div className='website'>
      <Canvas
        onClick={(_) => setBoxes(boxes.concat([1]))}>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {boxes.map((_: number, index: number) => <Box position={[index, 0, 0]} key={index.toString()} />)}
      </Canvas>
    </div>
  );
}

export default App;