import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLogin from './Middleware/ProtectedLogin'
import Login from "./Authentification/Login";
import Register from "./Authentification/Register";
export default function App(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<ProtectedLogin Compenent={Login} />} />
                <Route path="/register" element={<ProtectedLogin Compenent={Register}/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}