import Cabecera from "../cabecera/Cabecera"
import { Table,DropdownButton,Dropdown,Form, Row,Col} from "react-bootstrap"
import React, {useEffect, useState,form} from "react"
import axios from "axios"
import { Component } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import { response } from "express"
const RegistrarVenta = () =>{
  const [startDate, setStartDate] = useState(new Date());
  const [input,setInput] = useState({
    fechaVenta: '',
    idVenta:'',
    nombreCliente:'',
    tipoIdentificacion:'',
    numeroIdentificacion:'',
    nombreVendedor:''
  })
function fecha(){
  var fechaVentaActual
  var dia = String(startDate.getDate())
  var mes =String(startDate.getMonth()+1)
  var año =String(startDate.getFullYear())
  fechaVentaActual = dia + "/" + mes+"/" + año
  console.log(fechaVentaActual)
  
}
  const [isDisabled, setIsDisabled] = useState(true)
  function camposRequeridos(cambio){
    if(cambio=="") { 
      setIsDisabled(true)
  } else { 
    setIsDisabled(false)
     
  }
    
  }
  function handleChange(event){
    const{name, value} = event.target;
    setInput(prevInput => {
      return{
        ...prevInput,
        [name]:value     
      } 
    })
  }
  
  function handleChangeRegistro(event){
    const{name, value} = event.target;
    setInput(prevInput => {
      return{
        ...prevInput,
        [name]:value
        
      }
      
    })
    camposRequeridos(value)
  }
  function handleClick(event){
    event.preventDefault();
    const nuevaVenta = {
      fecha: input.fechaVenta,
      idVenta: input.idVenta,
      nombreCliente: input.nombreCliente,
      tipoIdentificacion: input.tipoIdentificacion,
      numeroIdentificacion: input.numeroIdentificacion,
      nombreVendedor: input.nombreVendedor
    }
    axios.post('http://localhost:4000/api/ventas',nuevaVenta)
    alert('Venta registrada correctamente')
  }
  var tipoDocu;
  function setDocumento(){
    tipoDocu = document.getElementById('tipoDocumento').value;
    input.tipoIdentificacion = tipoDocu;
    console.log(tipoDocu)
  }
  
    return(
      
        <body> 
            <Cabecera />
            <div className = "mb-5">
              <h2>Registro de ventas</h2>
            </div> 
        <div className = "mb-5">
        <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
        </div>
        <div className = "container">
        <div >
          <Form method = "post" >
            <Row className="justify-content-center mb-3">
            <Form.Group as={Col} xs="auto"> 
              <Form.Label className="mb-2">Fecha</Form.Label>
              <Form.Control  type="text" placeholder="Fecha de la venta" name="fechaVenta" value = {input.fechaVenta} onChange = {handleChange}/>      
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Form.Label>ID de la venta</Form.Label>
              <Form.Control type="text" placeholder="ID venta" name = "idVenta" value = {input.idVenta} onChange = {handleChange}/>
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Form.Label>Vendedor</Form.Label>         
              <Form.Control type="text" placeholder="Nombre del vendedor" name = "nombreVendedor" value = {input.nombreVendedor} onChange = {handleChange}/>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Form.Group as={Col} xs="auto">
          <Form.Label>Nombre del Cliente</Form.Label>    
          <Form.Control type="text" placeholder="Nombre del cliente" name = "nombreCliente" value = {input.nombreCliente} onChange = {handleChange}/>&nbsp;
          </Form.Group>
          <Form.Group as={Col} xs="auto">
          <Form.Label >Tipo de Identificación</Form.Label>    
          <Form.Select id="tipoDocumento" onChange = {setDocumento}>
            <option selected disabled>Seleccionar</option>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs="auto">
          <Form.Label>Número de identificación</Form.Label>    
          <Form.Control type="text" placeholder="Número de identificación" name = "numeroIdentificacion" value = {input.numeroIdentificacion} onChange = {handleChangeRegistro}/>&nbsp;
          </Form.Group>
          </Row>

          </Form>
        </div>
        <div className = "mt-3">
        <button type="button" id="venta" onClick = {handleClick} disabled={isDisabled}>Registrar venta</button>
        <button type="button" onClick = {fecha} >fecha</button>
        
        </div>
  </div>

    </body>
        
        
    )
        
    
} 
export default RegistrarVenta