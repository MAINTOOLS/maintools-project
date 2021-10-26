import React, { useState, useEffect } from "react";
import Cabecera from "../cabecera/Cabecera";
import { Redirect } from "react-router-dom";
import {
  Form,
  Col,
  InputGroup,
  Row,
  Button,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";
let resultado = "";

const RegistrarUsuario = () => {
  const [validated, setValidated] = useState(false);
  const [consulusuario, setConsulusuario] = useState([]);
  const [actualizar, setactualizar] = useState([]); 
  const [condicion , setCondicion] = useState(false);
  useEffect(() => {
    ConsultarUsuario();
  }, []);

  async function handleSubmit(event){
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (condicion == true) { 
      event.stopPropagation();
      event.preventDefault();
      let nombre = form["nombre"].value;
      let apellido = form["apellido"].value;
      let Correo = form["Correo"].value;

      event.preventDefault();
      const data = {
        nombre: nombre,
        apellido: apellido,
        Correo: Correo,
        estado_usuaio: "pendiente",
        estado: "activo",
        rol: "",
      };
      try {
        let config = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        let res =  await fetch(`http://localhost:4000/api/user/${actualizar._id}`, config);
        let json = await res.json();
        console.log(json);
        setactualizar([]);
        setCondicion(false);
        ConsultarUsuario();

        form.reset() 
        alert("Registro exitoso")
      } catch (error) {
        console.log(error);
      }
      
      console.log("actualizar");
      
    } else {
      let nombre = form["nombre"].value;
      let apellido = form["apellido"].value;
      let Correo = form["Correo"].value;

      event.preventDefault();
      const data = {
        nombre: nombre,
        apellido: apellido,
        Correo: Correo,
        estado_usuaio: "pendiente",
        estado: "activo",
        rol: "",
      };
      registrar(data);

      form.reset();
    }
    setValidated(true);
  };
  async function registrar(data) {
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch("http://localhost:4000/api/user", config);
      let json = await res.json();
      console.log(json);
      ConsultarUsuario();
      alert("Registro exitoso");
    } catch (error) {
      console.log(error);
    }
  }
  async function ConsultarUsuario() {
    try {
      await fetch("http://localhost:4000/api/user")
        .then((res) => res.json())
        .then(
          (result) => {
            setConsulusuario(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }
  const handleClick = (id) => (e) => {
    //Actualizar
    setCondicion(true);
    try {
      fetch(`http://localhost:4000/api/user/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setactualizar(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  function eliminar() {
    alert("eliminar");
  }
  let[loggedUser, setLoggedUser] = useState(
    localStorage.getItem('usuario') ?
    localStorage.getItem('usuario') :
    null
  )
  let[token,setToken] = useState(true);
  useEffect(()=>{
    const tokenStorage = localStorage.getItem('token')
    if(tokenStorage && loggedUser === "Administrador"){
      fetch("http://localhost:4000/usuarios",{
        headers: {
          "Content-Type":"application/json",
          token: tokenStorage
        }
      }).catch((err)=>console.error(err))
      .then((response)=>response.json())
      .then((usuarios)=>{
        console.log(usuarios);
      }) 
    }
     else{
      alert('Usted no esta autorizado');
      setToken(false);
    }
  },[])
  return (
    <div>
      {!token && <Redirect to = '/'/>}
      <Cabecera />
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card className="shadow p-3 mb-5 bg-body rounded">
            <Card.Body>
              <Card.Title>Registro Usuario</Card.Title>
            </Card.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="nombre"
                  defaultValue={actualizar == "" ? "" : `${actualizar.nombre}`}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="apellido"
                  defaultValue={
                    actualizar == "" ? "" : `${actualizar.apellido}`
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="Correo">
                <Form.Label>Correo</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="Correo">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Correo"
                    aria-describedby="inputGroupPrepend"
                    required
                    defaultValue={
                      actualizar == "" ? "" : `${actualizar.Correo}`
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="justify-content-md-center">
              <Col sm={12}>
                <Button type="submit">Enviar</Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </Container>
      {/* Inicio table  */}
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="card shadow mb-5 big-body rounded">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col" colSpan="1">
                    Correo
                  </th>
                  <th>Estado usuario</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody id="registro">
                {consulusuario.map((item) => (
                  <tr key={item._id}>
                    <th scope="row">{item._id}</th>
                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.Correo}</td>
                    <td>{item.estado_usuaio}</td>
                    <td>{item.estado}</td>
                    <td
                      id="actualizar"
                      onClick={handleClick(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      🖊
                    </td>
                    <td
                      id="eliminar"
                      onClick={eliminar}
                      style={{ cursor: "pointer" }}
                    >
                      🗑
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrarUsuario;
