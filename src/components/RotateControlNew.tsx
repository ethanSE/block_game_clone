/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Suspense } from "react";
import { Clone, useGLTF } from "@react-three/drei";

//const url = 'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/models/tapeMeasure.glb'


const url = '*/public/tapeMeasure.glb'

useGLTF.preload(url);

export default function Model(props: any) {
    const item: any = useGLTF<any>(url);
    console.log(item)
    return (
        // <group>
        //     <mesh
        //         castShadow
        //         receiveShadow
        //         geometry={item.nodes.measuring_tape_01.geometry}
        //         material={item.nodes.measuring_tape_01.material}
        //         position={[0, 0.189, -0.043]}
        //     />
        // </group>
        <primitive object={item.scene} />
    );
}

