(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let  resultado=""
    var forms = document.querySelectorAll('.needs-validation')
    let registro = document.querySelector('#registro')
    var data = [];
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) { 
         
        form.addEventListener('submit', function (event) { 
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else {
            let idusuario = form["idusuario"].value;
            let rolusuario = form["rolusuario"].value;
            let estadorol = form["estadorol"].value;
            

              
            event.preventDefault();
            data.push({idusuario:idusuario ,rolusuario:rolusuario ,  estadorol:estadorol});
            alert("Dato Añadido") 
            form.reset();
            console.log(data)
            mostrar()
          }    
         
         

  
          form.classList.add('was-validated')
        }, false)
      })

      function mostrar(){
        data.forEach((rol) =>{
          resultado += `<tr>
                            <td>${rol.idusuario}</td>
                            <td>${rol.rolusuario}</td>
                            <td>${rol.estadorol}</td>
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
