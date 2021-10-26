
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Button} from "react-bootstrap"
import swal from 'sweetalert';
import React, {useState} from "react"
import {render} from 'react-dom';
function Login() {
    const [show, setShow] = useState(true);
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
                if (respuestaServidor.usuario == null){
                    console.log("Se esta cerando su usuario ");
                    swal({
                        title: "Usuario registrado correctamente",
                        text: "Por favor espere que el Administrador le aigne un rol",
                        icon: "success",
                        button: "Aceptar",
                      });

                }else{
                    localStorage.setItem('token', response.tokenId);
                    localStorage.setItem('usuario',(respuestaServidor.usuario[0].estado_usuaio));
                    localStorage.setItem('nombre',(respuestaServidor.usuario[0].nombre));
                    console.log(respuestaServidor.usuario[0].nombre)
                    if(respuestaServidor.usuario[0].estado_usuaio == "pendiente"){
                        swal({
                            title: "Acceso denegado",
                            text: "Por favor espere que el Administrador le aigne un rol",
                            icon: "warning",
                            button: "Aceptar",
                          });
                    }else{
                        window.location.href = "/inicio"
                    }
                    

                }
                //localStorage.setItem('usuario',(respuestaServidor.usuario[0].estado_usuaio));
                //console.log(respuestaServidor.usuario[0].estado_usuaio);
                //console.log(response.tokenId);
                //window.location.href = "/RegistrarUsuario"
            });
          
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