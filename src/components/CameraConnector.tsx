// High level overview: Makes the top and bottom cameras move together

// There is a single react-three-fiber canvas on which everything is rendered
// this is split into two Views from @react-three/drei which both share the same camera + camera controls.
// The views are informed of where to lay themselves out via the "track" prop which is given a shared ref to a layout div

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CustomCamera from './visual/CustomCamera';
import css from '../styles/Game.module.css';
import { View } from '@react-three/drei';

export const CameraConnector = (props: {
    topDivProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    topContent: JSX.Element,
    bottomDivProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    bottomContent: JSX.Element
}) => {
    const gameAreaDivRef = useRef(null!);
    const pieceRotateDivRef = useRef(null!);
    const containerDivRef = useRef(null!);

    useEffect(() => {
        console.log('running')
    }, [props])

    return (
        <div className={css.canvasContainer} ref={containerDivRef}>
            {/* LAYOUT DIVS */}
            <div {...props.topDivProps} ref={gameAreaDivRef} />
            <div {...props.bottomDivProps} ref={pieceRotateDivRef} />

            <Canvas eventSource={containerDivRef} frameloop="always" style={{ position: 'absolute' }}>
                <CustomCamera />
                {/* TOP VIEW */}
                <View
                    index={1}
                    track={gameAreaDivRef}
                >
                    {props.topContent}
                </View>
                {/* BOTTOM VIEW */}
                <View
                    index={2}
                    track={pieceRotateDivRef}
                >
                    {props.bottomContent}
                </View>
            </Canvas>
        </div>
    );
};
