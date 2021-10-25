import { Table,DropdownButton,Dropdown,Form, Row,Col} from "react-bootstrap"
import Cabecera from "../cabecera/Cabecera"
//import { Table } from "react-bootstrap"
import React, {useEffect, useState} from "react"
import axios from "axios";
import Popup from "../../Popup";

var idActual;
//funcion boton




function RegistroVenta(){


  const[openPopup, setOpenPopup] = useState(false);
  const[busqueda,setBusqueda] = useState('');
  const [actualizarVenta,setActualizarVenta] = useState({
    fechaVenta: '',
    idVenta:'',
    nombreCliente:'',
    tipoIdentificacion:'',
    numeroIdentificacion:'',
    nombreVendedor:''
  })
  

  function handleChange(event){
    const{name, value} = event.target;
  
    setActualizarVenta(prevInput => {
      return{
        ...prevInput,
        [name]:value
      }
    })
  }
 
  function updateClick(event){
    event.preventDefault();
    const ventaActualizada = {
      fecha: actualizarVenta.fechaVenta,
      idVenta: actualizarVenta.idVenta,
      nombreCliente: actualizarVenta.nombreCliente,
      tipoIdentificacion: actualizarVenta.tipoIdentificacion,
      numeroIdentificacion: actualizarVenta.numeroIdentificacion,
      nombreVendedor: actualizarVenta.nombreVendedor
    }
    axios.put(`http://localhost:4000/api/ventas/${idActual}`,ventaActualizada)
    alert('Venta actualizada correctamente')
  }

  function eliminarClick(idEliminar){
    
    console.log(idEliminar)
    axios.delete(`http://localhost:4000/api/ventas/${idEliminar}`)
    alert('Venta eliminada correctamente')
  }
    const[notes, setNotes] = useState([{
      fecha:'',
      idVenta:'',
      nombreCliente:'',
      tipoIdentificacion:'',
      numeroIdentificacion:'',
      nombreVendedor:''
    }])

   //actualizar

    useEffect(()=>{
      fetch("http://localhost:4000/api/listaventas").then(res =>{
      if(res.ok){
        return res.json()
      }
      }).then(jsonRes => setNotes(jsonRes))
    })

    function selectFunction(tipdoc) {
      if(tipdoc == "Tarjeta de Identidad"){
        document.getElementById("tipoDocumento").value = "Tarjeta de Identidad";
      }
      else if(tipdoc == "Cédula de Ciudadanía"){
        document.getElementById("tipoDocumento").value = "Cédula de Ciudadanía";
      }
      else if(tipdoc == "Cédula de Extranjería"){
        document.getElementById("tipoDocumento").value = "Cédula de Extranjería";
      }
      
  };
    function id(idmongo, fechaMongo, idVentaMongo, clienteMongo, tipoIdentMongo, numeroIdentMongo, vendedorMongo){
      idActual = idmongo
      console.log(idActual)
      setOpenPopup(true)

      actualizarVenta.fechaVenta = fechaMongo;
      actualizarVenta.idVenta = idVentaMongo;
      actualizarVenta.nombreCliente = clienteMongo;
      actualizarVenta.tipoIdentificacion = tipoIdentMongo;
      actualizarVenta.numeroIdentificacion = numeroIdentMongo;
      actualizarVenta.nombreVendedor = vendedorMongo;
      setTimeout( function() { selectFunction(tipoIdentMongo); }, 100);
  }
  var tipoDocu;
  function setDocumento(){
    tipoDocu = document.getElementById('tipoDocumento').value;
    actualizarVenta.tipoIdentificacion = tipoDocu;
  }


    return <div>
    <Cabecera />
    <div className = "container mb-2">
      <h1>Lista de ventas</h1>
      <Form>
        <Row className = "justify-content-md-end">
      <Form.Group as={Col} xs="auto">
      <Form.Control xs="auto" type="text" placeholder="Buscar..." onChange = {event =>{setBusqueda(event.target.value)}} />
      </Form.Group>
      </Row>
      </Form>
      </div>
      <Table striped bordered hover className="container">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>ID venta</th>
            <th>Nombre cliente</th>
            <th>Tipo de identificación</th>
            <th>Número de identificación</th>
            <th>Vendedor</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
      {notes.filter((note)=>{
        if (busqueda == ""){
          return note
        } else if(note.nombreCliente.toString().toLowerCase().includes(busqueda.toString().toLowerCase())){
          return note.nombreCliente
        }
      }).map(note =>
              
      <tr>
        <td>{note.fecha}</td>
        <td>{note.idVenta}</td>
        <td>{note.nombreCliente}</td>
        <td>{note.tipoIdentificacion}</td>
        <td>{note.numeroIdentificacion}</td>
        <td>{note.nombreVendedor}</td>
        <td><button onClick = {()=>id(note._id, note.fecha, note.idVenta, note.nombreCliente, note.tipoIdentificacion, note.numeroIdentificacion, note.nombreVendedor)} >Editar</button>&nbsp;
        <button  onClick = {()=>eliminarClick(note._id)}>Eliminar</button></td>
      </tr>
      
        )}
      </tbody>
      </Table>
        <Popup openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}>

<div className = "container">
        <div >
          <Form method = "post" >
            <h2>Editar venta</h2>
            <Row className="justify-content-center mb-3">
            <Form.Group as={Col} xs="auto"> 
              <Form.Label className="mb-2">Fecha</Form.Label>
              <Form.Control  type="text" placeholder="Fecha de la venta" name="fechaVenta" value = {actualizarVenta.fechaVenta} onChange = {handleChange}/>      
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Form.Label>ID de la venta</Form.Label>
              <Form.Control type="text" placeholder="ID venta" name = "idVenta" value = {actualizarVenta.idVenta} onChange = {handleChange}/>
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Form.Label>Vendedor</Form.Label>         
              <Form.Control type="text" placeholder="Nombre del vendedor" name = "nombreVendedor" value = {actualizarVenta.nombreVendedor} onChange = {handleChange}/>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Form.Group as={Col} xs="auto">
          <Form.Label>Nombre del Cliente</Form.Label>    
          <Form.Control type="text" placeholder="Nombre del cliente" name = "nombreCliente" value = {actualizarVenta.nombreCliente} onChange = {handleChange}/>&nbsp;
          </Form.Group>
          <Form.Group as={Col} xs="auto">
          <Form.Label >Tipo de Identificación</Form.Label>    
          <Form.Select id="tipoDocumento" onChange = {setDocumento}>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs="auto">
          <Form.Label>Número de identificación</Form.Label>    
          <Form.Control type="text" placeholder="Número de identificación" name = "numeroIdentificacion" value = {actualizarVenta.numeroIdentificacion} onChange = {handleChange}/>&nbsp;
          </Form.Group>
          </Row>

          </Form>
        </div>
        </div>
        <div className = "mt-3">
        <button type="button" onClick = {updateClick}>Aceptar cambios</button>
        </div>
        
        
        </Popup>
      </div>
      
  }
  
  export default RegistroVenta;
  