document.addEventListener("DOMContentLoaded", function() {
    var enlaces = document.querySelectorAll(".menu__item > a");
    
    enlaces.forEach(function(enlace) {
        enlace.addEventListener("click", function(event) {
        event.preventDefault();
    
        enlaces.forEach(function(e) {
            e.classList.remove("active");
        });
    
        enlace.classList.add("active");
        });
    });
    });
                                            /*          DESDE AQUÍ LAS FUNCIONES                 */

   /* 
   
   function validarInsertar() {
      var valorNumerico = document.getElementById("valorNumerico").value;
      var valFinal=parseInt(valorNumerico);
      console.log(valFinal);
      const valorMinimo = 1;
      const valorMaximo = 65; 
      const edad = valorNumerico;
      if (valFinal < valorMinimo || valFinal > valorMaximo) {
        alert(
          "El campo valor digitado en el campo Valor Numérico, no se encuentra dentro del rango comprendido entre " +valorMinimo +" y " + valorMaximo + "."
        );
        return;
      }
      alert("¡Valor válido! Puedes continuar con el proceso.");
    } 
    
    */


      btnEliminar.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".campo input");
        for (const input of inputs) {
          input.value = "";
        }       
      });
    

    btnModificar.addEventListener("click", () => {
      alert("Datos modificados!");
    });
    
    btnGuardar.addEventListener("click", () => {
      alert("Datos guardados!");
    });
    





    