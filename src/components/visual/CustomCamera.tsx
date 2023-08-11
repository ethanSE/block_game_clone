import { OrthographicCamera, OrbitControls } from '@react-three/drei';

//prevents camera from going below just above the plane of the board
//under the board is not useful and disorienting
//below this the shadow is weird and flat 
const maxVerticalViewAngle = (Math.PI / 2) * .9;

export default function CustomCamera() {
    return (
        <>
            <OrthographicCamera
                makeDefault
                position={[-3, 6, 10]}
                zoom={60}
            />
            <OrbitControls
                makeDefault
                panSpeed={1}
                maxAzimuthAngle={Number.POSITIVE_INFINITY} //can spin board
                minAzimuthAngle={Number.NEGATIVE_INFINITY}
                maxPolarAngle={maxVerticalViewAngle} //cannot move camera below board plane
                enablePan={false}
                minDistance={6}
                minZoom={35}
                maxZoom={80}
            />
        </>
    )
}