import React, { useState, useEffect } from "react";
import Cabecera from "../cabecera/Cabecera";
import ActualizarProducto from "./ActualizarProducto";
import { Table, Container } from "react-bootstrap";
const ConsultarProducto = () => {
  const [consultProducto, setConsultProducto] = useState([]);
  const [formProduct, setFormProduct] = useState({});
  const [textBuscar, setTextBuscar] = useState("");
  const [consultProductoBackup, setConsultProductoBackup] = useState({});

  //si es administrador o vendedor ocultaro mostrar usando {rol&&< .../>}
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
   // 
  useEffect(() => {
    ConsultarProducto();
  }, []);

  async function ConsultarProducto() {
    try {
      await fetch("http://localhost:4000/api/productos")
        .then((res) => res.json())
        .then(
          (result) => {
            setConsultProducto(result);
            setConsultProductoBackup(result);
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
    //Traer el elemento para ctualizarlo y enviar el resultado al estado
    try {
      fetch(`http://localhost:4000/api/productos/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setFormProduct(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = (id) => (e) => {
    //Traer el elemento para actualizar el estado
    try {
      fetch(`http://localhost:4000/api/productos/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            alerta(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  function alerta(result) {
    var opcion = window.confirm("Estás seguro que deseas eliminar este producto");
    if (opcion == true) {
      CambiarEstado(result);
    }
  }

  async function CambiarEstado(result) {
    const id = result._id
    const datos = {
      nombre: result.nombre,
      valor: result.valor,
      Descripcion: result.Descripcion,
      estado_producto: result.estado_producto,
      estado: "desactivado",
    };

    //Peticion fetch
    try {
      let config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };
      let res = await fetch(
        `http://localhost:4000/api/productos/${id}`,
        config
      );
      let json = await res.json();
      console.log(json);
      ConsultarProducto()
      alert("Eliminación exitosa");
    } catch (error) {
      console.log(error);
    }
  }

  const filter = (event) => {
    console.log(event.target.value);
    let text = event.target.value;
    const data = consultProductoBackup;
    const newData = data.filter(function (item) {
      const itemData = item.nombre;
      const textData = text;
      //Filrar si es verdadero o no
      return itemData.indexOf(textData) > -1;
    });
    setConsultProducto(newData);
    setTextBuscar(text);
  };

  return (
    <div>
      <Cabecera />
      <ActualizarProducto
        update={formProduct}
        ConsultarProducto={ConsultarProducto}
      />
      <Container>
        <form className="form-inline my-2 my-lg-0">
          <div className="row d-flex justify-content-end">
            <div className="col-sm-3 mb-3">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                defaultValue={textBuscar}
                onChange={filter}
              />
            </div>
            {/* <div className="col-md-1 mb-3">
              <button className="btn btn btn-dark my-2 my-sm-0" type="submit">
                Search
              </button>
            </div> */}
          </div>
        </form>
        <Table
          className="shadow p-3 mb-5 bg-body rounded"
          striped
          bordered
          hover
        >
          <thead>
            <tr className="table-primary">
              <th>#</th>
              <th>Nombre</th>
              <th>Valor unitario</th>
              <th>Estado producto</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {consultProducto.map((item) => (
              item.estado == "Activo" ? 
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.nombre}</td>
                <td>{item.valor}</td>
                <td>{item.estado_producto}</td>
                <td>{item.Descripcion}</td>
                <td>{item.estado}</td>
                <td>
                  <a
                    onClick={handleClick(item._id)}
                    title="Editar"
                    aria-label="a rocket blasting off"
                    role="img"
                    style={{ cursor: "pointer" }}
                  >
                    🖋
                  </a>
                </td>
                <td>
                  <a
                    title="Eliminar"
                    aria-label="a rocket blasting off"
                    role="img"
                    style={{ cursor: "pointer" }}
                    onClick={handleClickDelete(item._id)}
                  >
                    🗑
                  </a>
                </td>
              </tr>
              : false
            ))} 

            {/* <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ConsultarProducto;
