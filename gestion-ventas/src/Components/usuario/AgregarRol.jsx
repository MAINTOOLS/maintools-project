import React, { useState, useEffect } from "react";
import Cabecera from "../cabecera/Cabecera";
import {
  Form,
  Col,
  InputGroup,
  Row,
  Button,
  Container,
  Card,
} from "react-bootstrap";

const AgregarRol = () => {
  const [validated, setValidated] = useState(false);
  const [consultarRol, setConsultarRol] = useState([]);
  const [actualizar, setactualizar] = useState([]);
  const [condicion , setCondicion] = useState(false);
  useEffect(() => {
    ConsultarRol();
   
  }, []);
  async function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (condicion == true) {
      event.stopPropagation();
      event.preventDefault();
      let nombreRol = form["nombreRol"].value;

      event.preventDefault();
      const data = {
        nombreRol: nombreRol,
        estado:"activo"
      
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
        let res = await fetch(
          `http://localhost:4000/api/user/rol/${actualizar._id}`,
          config
        );
        let json = await res.json();
        console.log(json);
        setactualizar([]);
        setCondicion(false);
        ConsultarRol();

        form.reset();
        alert("Registro exitoso");
      } catch (error) {
        console.log(error);
      } 
      console.log("actualizar");


    } else {
      let nombreRol = form["nombreRol"].value;
      event.preventDefault();
      const data = {
        nombreRol: nombreRol,
        estado: "activo",
        rol: "",
      };

      registrar(data);
      form.reset();
    }
    setValidated(true);
  }
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
      let res = await fetch("http://localhost:4000/api/user/rol", config);
      let json = await res.json();
      console.log(json);
      ConsultarRol();

      alert("Registro exitoso");
    } catch (error) {
      console.log(error);
    }
  }
  async function ConsultarRol() {
    try {
      await fetch("http://localhost:4000/api/user/rol")
        .then((res) => res.json())
        .then(
          (result) => {
            setConsultarRol(result);
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }
  //Asignar rol y cambiar estado de un ususario
  //Actualizar
  const handleClick = (id) => (e) => {
    //Actualizar
    setCondicion(true);
    try {
      fetch(`http://localhost:4000/api/user/rol/${id}`)
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

  return (
    <div>
      <Cabecera />
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <Card
              className="shadow p-3 mb-5 bg-body rounded justify-content-md-center "
              style={{ width: "60%" }}
            >
              <Card.Body>
                <Card.Title>Registrar Rol</Card.Title>
              </Card.Body>

              <Form.Group
                as={Row}
                controlId="nombreRol"
                className="justify-content-md-center"
              >
                <Form.Label column sm="2">
                  Nombre Rol
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="nombreRol"
                    defaultValue={
                      actualizar == "" ? "" : `${actualizar.nombreRol}`
                    }
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Row className="justify-content-md-center mt-3">
                <Col sm={12}>
                  <Button type="submit">Enviar</Button>
                </Col>
              </Row>
            </Card>
          </Row>
        </Form>
      </Container>
      {/* inicio de table */}
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div
            className="card shadow mb-6 big-body rounded"
            style={{ width: "60%" }}
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Rol usuario</th>
                  <th scope="col">Estado rol</th>
                </tr>
              </thead>
              <tbody id="registro">
                {consultarRol.map((item) => (
                  <tr key={item._id}>
                    <th scope="row">{item._id}</th>
                    <td>{item.nombreRol}</td>
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
export default AgregarRol;
