import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { useRef } from 'react';

//prevents camera from going below just above the plane of the board
//under the board is not useful and disorienting
//below this the shadow is weird and flat 
const maxVerticalViewAngle = (Math.PI / 2) * .9;

const defaultBoardCenter: Vector3 = new Vector3(2, 0, 1.5);



export default function CustomCamera() {
    // const { camera } = useThree();

    // // const a = new Vector3(0, 1, 0);

    // const getQuat = console.log(camera)
    // let a = 0;
    // useFrame((state, delta, xrFrame) => {
    //     if (delta) {
    //         a += 1;
    //         if (a % 100 === 0) {
    //             console.log(delta)
    //             console.log(state.camera.quaternion)
    //         }
    //     }
    // })
    // const r = useRef<typeof OrthographicCamera>(null!)
    // console.log(r)
    return (
        <>
            <OrthographicCamera
                makeDefault
                position={[-3, 6, 10]}
                zoom={60}
            />
            <OrbitControls
                // onChange={() => console.log(props.cameraRef)}
                target={defaultBoardCenter}
                panSpeed={1}
                maxAzimuthAngle={Number.POSITIVE_INFINITY} //can spin board
                minAzimuthAngle={Number.NEGATIVE_INFINITY}
                maxPolarAngle={maxVerticalViewAngle} //cannot move camera below board plane
                enablePan={false}
                minDistance={6}
                minZoom={40}
                maxZoom={80}
            />
        </>
    )
}