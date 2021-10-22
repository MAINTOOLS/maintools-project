
import Cabecera from "../cabecera/Cabecera"
import { Table } from "react-bootstrap"
import React, {useEffect, useState} from "react"
import axios from "axios";


var idActual;
//funcion boton
  function id(par){
    idActual = par
    console.log(idActual)
    //window.open("http://localhost:3000/detalles")
}



function RegistroVenta(){

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
    return <div>
    <Cabecera />
      <h1>Lista de ventas</h1>
      
      <Table striped bordered hover className="container">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>ID venta</th>
            <th>Nombre cliente</th>
            <th>Tipo de identificación</th>
            <th>Número de identificación</th>
            <th>Vendedor</th>
          </tr>
        </thead>
        <tbody>
      {notes.map(note =>
              
      <tr>
        <td>{note.fecha}</td>
        <td>{note.idVenta}</td>
        <td>{note.nombreCliente}</td>
        <td>{note.tipoIdentificacion}</td>
        <td>{note.numeroIdentificacion}</td>
        <td>{note.nombreVendedor}</td>
        <td><button onClick = {()=>id(note._id)} >Editar</button></td>
      </tr>
      
        )}
      </tbody>
      </Table>
      <h1>Editar venta</h1>
      <div className = "container">
          <form method = "put"> 
          <input type="text" placeholder="Fecha de la venta" name="fechaVenta" value = {actualizarVenta.fechaVenta} onChange = {handleChange}/>&nbsp;   
          <input type="text" placeholder="ID venta" name = "idVenta" value = {actualizarVenta.idVenta} onChange = {handleChange}/>&nbsp;
          <input type="text" placeholder="Nombre del cliente" name = "nombreCliente" value = {actualizarVenta.nombreCliente} onChange = {handleChange}/>&nbsp;
          <input type="text" placeholder="Tipo de identificación" name = "tipoIdentificacion" value = {actualizarVenta.tipoIdentificacion} onChange = {handleChange}/>&nbsp;
          <input type="text" placeholder="Número de identificación" name = "numeroIdentificacion" value = {actualizarVenta.numeroIdentificacion} onChange = {handleChange}/>&nbsp;
          <input type="text" placeholder="Nombre del vendedor" name = "nombreVendedor" value = {actualizarVenta.nombreVendedor} onChange = {handleChange}/>&nbsp;         
          </form>
        </div>
        <div className = "mt-3">
        <button type="button" onClick = {updateClick}>Registrar venta</button>
        </div>
      </div>
  }
  
  export default RegistroVenta;
  