

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


    document.addEventListener('DOMContentLoaded', function () {
      const fechaInput = document.querySelector('.campo3 input[type="date"]');
      const valorInput = document.querySelector('.campo2 input[for="valorPagFac"]');
      const clienteInput = document.querySelector('.campo2 input[for="clientePagFac"]');
      const metodoPagoSelect = document.querySelector('.but');
      const tableBody = document.querySelector('.body__table');
      const detallesPagoData = obtenerDetallesPagoGuardados() || [];
  
      document.querySelector('#btnInsertar').addEventListener('click', insertarDetallePago);
      document.querySelector('#btnEliminar').addEventListener('click', eliminarPrimeraFila);
      document.querySelector('#btnGuardar').addEventListener('click', guardarCambios);
  
      updateTable();
  
      function insertarDetallePago() {
          const fecha = fechaInput.value;
          const valor = valorInput.value;
          const cliente = clienteInput.value;
          const metodoPago = metodoPagoSelect.value;
  
          if (!fecha || !valor || !cliente || !metodoPago) {
              showMessage('Completa todos los campos antes de agregar un detalle de pago.', 'red');
              return;
          }
  
          const detallePago = {
              numeroFactura: detallesPagoData.length + 1,
              fecha: fecha,
              valor: valor,
              cliente: cliente,
              pago: metodoPago
          };
  
          detallesPagoData.push(detallePago);
          guardarDetallesPago(detallesPagoData);
          showMessage('Se ha insertado correctamente el Detalle de Pago', 'green');
          fechaInput.value = "";
          valorInput.value = "";
          clienteInput.value = "";
          metodoPagoSelect.value = "";
          updateTable();
      }
  
      function eliminarPrimeraFila() {
          if (detallesPagoData.length > 0) {
              detallesPagoData.shift();
              guardarDetallesPago(detallesPagoData);
              updateTable();
              showMessage('Se ha eliminado la primera fila correctamente', 'green');
          } else {
              showMessage('No hay filas para eliminar', 'red');
          }
      }
  
      function guardarCambios() {
          showMessage('Cambios guardados temporalmente', 'blue');
      }
  
      function updateTable() {
          tableBody.innerHTML = '';
  
          detallesPagoData.forEach(function (detallePago) {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${detallePago.numeroFactura}</td>
                  <td>${detallePago.fecha}</td>
                  <td>${detallePago.valor}</td>
                  <td>${detallePago.cliente}</td>
                  <td class="element__modifier">
                      <button class="botonMod botonMod-active" onclick="mostrarFormularioEdicion(${detallePago.numeroFactura})">Modificar</button>
                  </td>
              `;
  
              tableBody.appendChild(row);
          });
      }
  
      window.mostrarFormularioEdicion = function (numeroFactura) {
          const detallePago = detallesPagoData.find(detallePago => detallePago.numeroFactura === numeroFactura);
          fechaInput.value = detallePago.fecha;
          valorInput.value = detallePago.valor;
          clienteInput.value = detallePago.cliente;
          metodoPagoSelect.value = detallePago.pago;
  
          let btnguardarcamb = document.getElementById('btnGuardar');
          btnguardarcamb.onclick = function () {
              detallePago.fecha = fechaInput.value;
              detallePago.valor = valorInput.value;
              detallePago.cliente = clienteInput.value;
              detallePago.pago = metodoPagoSelect.value;
              guardarDetallesPago(detallesPagoData);
              updateTable();
              showMessage('Se ha modificado la fila correctamente', 'blue');
              fechaInput.value = "";
              valorInput.value = "";
              clienteInput.value = "";
              metodoPagoSelect.value = "";
          };
      }
  
      function guardarDetallesPago(detallesPago) {
          localStorage.setItem('detallesPagoDataVentana1', JSON.stringify(detallesPago));
      }
  
      function obtenerDetallesPagoGuardados() {
          const detallesPagoGuardados = localStorage.getItem('detallesPagoDataVentana1');
          return detallesPagoGuardados ? JSON.parse(detallesPagoGuardados) : null;
      }
  
      function showMessage(message, backgroundColor) {
          const messageContainer = document.createElement('div');
          messageContainer.classList.add('message-container');
          messageContainer.style.backgroundColor = backgroundColor;
          messageContainer.textContent = message;
          document.body.appendChild(messageContainer);
          setTimeout(() => {
              document.body.removeChild(messageContainer);
          }, 3000);
      }
  }); 





      btnEliminar.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".campo input");
        for (const input of inputs) {
          input.value = "";
        }       
      });
    

   /* btnModificar.addEventListener("click", () => {
      alert("Datos modificados!");
    });
    
    btnGuardar.addEventListener("click", () => {
      alert("Datos guardados!");
    }); */
    





    