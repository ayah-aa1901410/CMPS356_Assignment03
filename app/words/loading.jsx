"use client"
import { TailSpin } from "react-loader-spinner";
// import { SpinnerRound } from 'spinners-react';
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
// export default function Loading(){
//     return (     
//          <div class="full-spinner">
//             <TailSpin
//                 type="Puff"
//                 color="#00BFFF"
//                 height={100}
//                 width={100}
//                 timeout={3000} 
//                 /> 
//             <p style={{ color: "green" }}>Loading ... </p>
//         </div>)
// }