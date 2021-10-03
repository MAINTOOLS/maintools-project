(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let resultado = ""
    var forms = document.querySelectorAll('.needs-validation')
    var data = [];
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) { 
         
        form.addEventListener('submit', function (event) { 
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else {
            let indetificador = form["identificador"].value;
            let nombre = form["nombre"].value;
            let apellido = form["apellido"].value;
            let correo = form["correo"].value;
            let estado = form["estado"].value;

              
            event.preventDefault();
            data.push({indetificador:indetificador ,nombre:nombre ,  apellido:apellido , correo:correo , estado:estado});
            alert("Dato Añadido") 
            form.reset();
           
            console.log(data)
            mostrar()
          }    
         
         

  
          form.classList.add('was-validated')
        }, false)
      }) 
      function mostrar(){
        data.forEach((usuario) =>{
          resultado += `<tr>
                            <td>${usuario.indetificador}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.apellido}</td>
                            <td>${usuario.correo}</td>
                            <td>${usuario.estado}</td>
                            <td id="actualizar" onclick="actualizar()">&#128394</td>
                            <td id="eliminar" onclick="eliminar()">&#128465</td>
                          </tr>`
        }) 
        registro.innerHTML = resultado
      }
  })()  
  function actualizar(){
    alert("Actualizar");
  } 
  function eliminar(){
    alert("Eliminar");
  }

  