import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
function Login() {
    function responseGoogle(response){
        if  (response && response.tokenId) {
            console.log(response)
            const infoGoogle = {
                token: response.tokenId,
                email: response.profileObj.email,
                nombres: response.profileObj.givenName,
                apellidos: response.profileObj.familyName
            }
            axios.post('http://localhost:4000/login',infoGoogle).then((respuestaServidor)=>{
                console.log(infoGoogle);
            })
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