import Cabecera from "../cabecera/Cabecera"
import React, { useState, useEffect } from "react";
const axios = require('axios');

function PaginaInicio(){

    let[token,setToken] = useState(true);
    useEffect(()=>{
   
    const tokenStorage = localStorage.getItem('nombre')
        setToken(tokenStorage)
    },[])

    

      
return (
<div>
<Cabecera />
<h2>Bienvenido {token}</h2>

</div>


)
}
export default PaginaInicio;