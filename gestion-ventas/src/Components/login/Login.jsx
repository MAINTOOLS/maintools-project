import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
function Login() {
    function responseGoogle(response){
        if  (response && response.tokenId) {
            fetch('http://localhost:4000/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    token: response.tokenId,
                    email: response.profileObj.email,
                    nombres: response.profileObj.givenName,
                    apellidos: response.profileObj.familyName
                })
            }).catch((err)=>console.error(err))
            .then((respuesta)=>respuesta.json())
            .then((respuestaServidor)=>{
                
                localStorage.setItem('token', response.tokenId);
                localStorage.setItem('usuario',(respuestaServidor.usuario[0].estado_usuaio));
                console.log(respuestaServidor.usuario[0].estado_usuaio);
                window.location.href = "/RegistrarUsuario"
            });
            
                //console.log(dataGoogle);
                //localStorage.setItem('token', response.tokenId);
                //localStorage.setItem('usuario',JSON.stringify(dataGoogle));
                //window.location.href = "/RegistrarUsuario"

            
        }
    }
    return(
        <div>
            <h1>Inicio de sesión</h1>
            <GoogleLogin
                clientId="889938699203-ufrbrbdjjlllfal5f5qksrfqpa54aavf.apps.googleusercontent.com"
                buttonText="Iniciar sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
} 
export default Login