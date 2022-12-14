"use client"
import { TailSpin } from "react-loader-spinner";
export default function Loading(){
    return (
        <>       
            <TailSpin
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} 
                /> 
            <p style={{ color: "green" }}>Loading ... </p>
        </>
    )
}
