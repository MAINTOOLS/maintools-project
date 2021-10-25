import React from "react";
import GoogleLogin from "react-google-login";
function Login() {
    function responseGoogle(response){
        console.log(response);
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