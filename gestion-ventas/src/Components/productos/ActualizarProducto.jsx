import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  InputGroup,
  Col,
  Button,
} from "react-bootstrap";

const ActualizarProducto = (props) => {
  var rol = true;
    let[loggedUser, setLoggedUser] = useState(
        localStorage.getItem('usuario') ?
        localStorage.getItem('usuario') :
        null
      )

if(loggedUser === "Administrador"){
        rol = true
    }else if (loggedUser === "Vendedor"){
        rol = false
    }
  const { update, ConsultarProducto } = props;
  const [loader, setLoader] = useState(false)
  const [formValue, setFormValue] = useState({
      nombre: "",
      valor: "",
      estado_producto: "",
      descripcion: "",
      estado: ""
  })

  useEffect(() => {
    prueba();
  },[update]);

  const prueba = () =>{
    setFormValue({
      nombre: update.nombre,
      valor: update.valor,
      estado_producto: update.estado_producto,
      descripcion: update.Descripcion,
      estado: update.estado
    })
  }

  const handleSubmit = (event) => {
    setLoader(true)
    const form = event.currentTarget;
    event.preventDefault();
    let nombre = form["productName"].value;
    let valor = form["valueUnit"].value;
    let estado_producto = form["stateProduct"].value;
    let descripcion = form["description"].value;
    let estado = form["estado"].value;
    const dataform = {
      nombre: nombre,
      valor: valor,
      estado_producto: estado_producto,
      Descripcion: descripcion,
      estado: estado,
    };
    setTimeout(() => {
      actualizarProducto(dataform, update._id, form);
    }, 3000);
  };

  async function actualizarProducto(dataform, id, form){
    try {
      let config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataform),
      };
      let res = await fetch(`http://localhost:4000/api/productos/${id}`, config);
      let json = await res.json();
      console.log(json);
      setLoader(false)
      ConsultarProducto()
      cancelar()
      form.reset()
      alert("Actualización exitosa")
    } catch (error) {
      console.log(error);
    }
    
  };

  function cancelar() {
    // window.location.reload();
    setFormValue({
      nombre: "",
      valor: "",
      estado_producto: "",
      descripcion: "",
      estado: ""
    })
  }

  return (
    <div>
      {rol&&<Container> 
        <Form className="mb-5 form" onSubmit={handleSubmit}>
          <Card
            className="shadow p-3 mb-5 bg-body rounded"
            style={{ width: "100%" }}
          >
            <Card.Body>
              <Card.Title>Actualizar Producto</Card.Title>
            </Card.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="productName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  defaultValue={formValue.nombre}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="valueUnit">
                <Form.Label>Valor unitario</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  defaultValue={formValue.valor}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="stateProduct">
                <Form.Label>Estado del producto</Form.Label>
                <Form.Control
                  imput="text"
                  placeholder=""
                  defaultValue={formValue.estado_producto}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  imput="text"
                  placeholder=""
                  defaultValue={formValue.descripcion}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  imput="text"
                  placeholder=""
                  defaultValue={formValue.estado}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="justify-content-md-center mt-2 mb-3">
              <Col sm={4}>
                <div className="d-grid gap-2 mx-auto">
                  <Button type="submit">
                    { loader == false ? "Actualizar Producto" : <img src={"https://acegif.com/wp-content/uploads/loading-25.gif"} alt="gif de algo" style={{ width: "20px" }}/>}
                    
                  </Button>
                </div>
              </Col>
              <Col sm={4}>
                <div className="d-grid gap-2 mx-auto">
                  <Button
                    className="btn btn-danger"
                    onClick={cancelar}
                    id="cancelar"
                  >
                    Cancelar
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Form>
      </Container>}
    </div>
  );
};
export default ActualizarProducto;
