import Cabecera from "../cabecera/Cabecera"
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
const axios = require('axios');

function PaginaInicio(){

    let[token,setToken] = useState(true);
    useEffect(()=>{
   
    const tokenStorage = localStorage.getItem('nombre')
        setToken(tokenStorage)
    },[])

    const cerrar = () =>{
        localStorage.clear();
        setToken(true)
        window.location="/";
        
    }

    

      
return (
<div>
<Cabecera />
<h2>Bienvenido {token}</h2>
<button onClick={cerrar}>Logout</button>
</div>


)
}
export default PaginaInicio;