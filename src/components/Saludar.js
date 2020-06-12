import React from 'react'

export default function HolaMundo(props) {
    const {info, saludarFn} = props;
    const {name="anon", edad}=info
    return (
        <div>
            <button onClick={()=>saludarFn(name, edad)}>
                saluda
            </button>
        </div>
    )
}
