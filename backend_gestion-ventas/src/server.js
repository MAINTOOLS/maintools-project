const axios = require('axios')
// Montar el servidor
const express = require("express"); // requerimos el modulo de express
const mongoose = require("mongoose"); // requerimo el modulo de mongoose
const cors = require("cors")
//Google Oauth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "889938699203-ufrbrbdjjlllfal5f5qksrfqpa54aavf.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const registrarSchema = require("./models/registrar_usuaio");
const router = express.Router();
const app = express(); // ejecutamos express (express() retorna el objeto de la aplicación)
const port = process.env.PORT || 4000; // process.env.PORT toma el puerto del hosting cuando ya este en producción
require("dotenv").config(); // ruta para conectarnos a la base de datos mongodb atlas

const productRouter = require("./routes/producto_route") //requerimos el archivo donde esta la ruta
const registrarUsuario_route = require("./routes/regitrarUsuario_route")
const registrar_rol = require("./routes/registrarRol_usuario")
const ventaRoutes = require("./routes/venta_route")
// Variable de entrono para la conexion
const mongo_uri = "MONGODB_URI=mongodb+srv://Maintools:maintools@registroventas.jih7d.mongodb.net/GestionVentas?retryWrites=true&w=majority";
//middleware
app.use(cors())
app.use(express.json()) // hace que la peticion sea reconocida

app.use('/api', productRouter) // que le agregue '/api' a todas las rutas que se creanas
app.use('/api', registrar_rol)
app.use('/api', registrarUsuario_route)
app.use('/api',ventaRoutes)
//routes
app.get("/", (req, res) => {
  res.send("welcome to my api");
});

//mongobd connection
mongoose
  .connect(mongo_uri)
  .then(() => console.log("Database connect"))
  .catch((error) => console.error(error))

 //Verificar token google
 async function verify(token){
   try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return userid;
   }catch(error){
      console.error(error);
      return null;
   }
 } 
 async function registrar(dataGoogle) {
  try {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataGoogle),
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
app.post('/login', async (req,res) =>{
  let userid = await verify(req.body.token);
  if(userid){
    const dataGoogle = {
      nombre: req.body.nombres,
      apellido: req.body.apellidos,
      Correo: req.body.email,
      estado_usuaio: "pendiente",
      estado: "activo",
      rol: "",
    };
    axios.post('http://localhost:4000/api/user',dataGoogle)
    res.send({
      succes: true,
      message: "El token es valido"
      
    })
  }else{
    res.status = 400;
    res.send({
      error: true,
      message: "No se pudo validar el usuario"
    })

  }
}) 
app.listen(port, () => console.log("server listning on port", port)); // que el servidor escucher en un pyerto especifico