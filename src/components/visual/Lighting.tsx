
import React from "react"

export const Lighting = React.memo(() => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={5000} />
            <pointLight position={[-10, -10, -10]} intensity={1000} />
        </>
    )
}, (a, b) => true)