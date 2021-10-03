(function () {
  //   var forms = document.querySelectorAll(".needs-validation"); 
  let resultado=""
  var data = [];
  //   Array.prototype.slice.call(forms).forEach(function (form) {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formrol").addEventListener("submit", registrar);
  });

  function registrar(event){
    event.preventDefault();

    let nombrerol = document.forms["formrol"]["nombrerol"].value;

    data.push({ nombrerol: nombrerol });
    alert("Rol Añadido"); 
    formrol.reset();
    document.getElementById("formrol").reset
    console.log(data);
    mostrar()
  } 
  function mostrar(){
    data.forEach((nombre , index) =>{
       resultado += `<tr> 
                     <td>${index}</td>
                     <td>${nombre.nombrerol}</td>
                     <td>Activo</td>
                     <td id="actualizar" onclick="actualizar()">&#128394</td>
                     <td id="eliminar" onclick="eliminar()">&#128465</td>
                    </tr>`
    }) 
    registro.innerHTML = resultado
  }
  //   });
})(); 
function actualizar(){
    alert("Actualizar");

} 
function eliminar(){
    alert("Eliminado");
}
