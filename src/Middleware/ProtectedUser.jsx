import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedUser({Compenent}){
    const Navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user_info'))
    useEffect( ()=>{
        if(!user){
            Navigate('/')
        }
    },[user,Navigate])
    return(
        <>
        <Compenent/>
        </>
    )
}