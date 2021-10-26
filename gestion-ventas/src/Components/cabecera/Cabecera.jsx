import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, {useState} from "react"
const Cabecera = () => {
  
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

  return (
    <div>
      <Navbar className="mb-5" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/inicio">Gestion de ventas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {rol &&<NavDropdown title="Usuario" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/RegistrarUsuario">
                  Registrar usuario
                </Link>
                <Link className="dropdown-item" to="/RegistrarRol">
                  Asignar rol
                </Link>
                <Link className="dropdown-item" to="/AgregarRol">
                  Registrar Rol
                </Link>
              </NavDropdown>}
              <NavDropdown title="Producto" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/RegistrarProducto">
                  Registrar producto
                </Link>
                <Link className="dropdown-item" to="ConsultarProducto">
                  Consultar producto
                </Link>
              </NavDropdown>
              <NavDropdown title="Venta" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="RegistrarVentas">
                  Registrar venta
                </Link>
                <Link className="dropdown-item" to="ConsultarVentas">
                  Lista de ventas
                </Link>
                {/* Si quiere agregar un nuevo enlace se hace lo mismo que en Registrar venta */}
                {/* ej: <Link className="dropdown-item" to="nombre de ruta a enviar">
                        Nombre de la pagina
                    </Link> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Cabecera;
