/*document.getElementById('Guardar').addEventListener('click',function(){
    alert('El contenido ha sido Guardado' )
})
function milegrilla(){
    alert('El contenido ha sido Modificado' );
}
document.getElementById('Insertar').addEventListener('click',function(){
    alert('Se ha Insertado el Contenido' )
})
document.getElementById('Eliminar').addEventListener('click',function(){
    alert('El contenido ha sido Eliminado' )
})
document.getElementById('Asiento Contable').addEventListener('click',function(){
    alert('Se a realizado el asiento contable' )
})*/
function limpiartodo(){
                
    document.getElementById('cedula').value= "";
    document.getElementById('nombres').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('mote').value= "";
    document.getElementById('prueba').value = "";
}
        document.addEventListener('DOMContentLoaded', function () {
        const insertarClienteBtn = document.getElementById('Insertar');
        // const cedulaInput = document.querySelector('.campo:nth-child(1) input');
        // const NombresInput = document.querySelector('.campo:nth-child(2) input');
        // const ApellidosInput = document.querySelector('.campo:nth-child(3) input');
        //     //var valorInput = document.getElementById('valornumber').value;
        // // const valorInput = document.querySelector('.campo:nth-child(4) input')
        // const MotivoInput = document.querySelector('.campo:nth-child(4) input'); //
        // const DetalleInput = document.querySelector('.campo:nth-child(4) input'); //
        

        const tableBody = document.querySelector('.body__table');
        //var valorNum=parseFloat(valorInput);
        const clientesData = [];

        insertarClienteBtn.addEventListener('click', function () {
            const cedula= document.getElementById('cedula').value;
            const Nombres= document.getElementById('nombres').value;
            const Apellidos= document.getElementById('apellidos').value;
            const Motivo= document.getElementById('mote').value;
            const Detalle= document.getElementById('prueba').value;
            console.log(cedula);
            console.log(Nombres);
            console.log(Apellidos);
            console.log(Motivo);
            //console.log(DetalleInputii);
            console.log(Detalle);
            // const valor= valorInput.value;
           // var valorInput = document.getElementById('valorNumerico').value;
           // var valorNum=parseFloat(valorInput);
            //console.log(valorNum);
            // Validaciones
            if (cedula.length !== 10) {
                showMessage('La Cédula debe tener 10 dígitos.', 'red');
                return;
            }

            if (Nombres.length > 25) {
                showMessage('Los Nombres no pueden exceder los 25 caracteres.', 'red');
                return;
            }

    
            if (Apellidos.length > 30) {
                showMessage('La Apellidos no pueden exceder los 30 caracteres.', 'red');
                return;
            }
            if (Motivo.length > 30){
                showMessage('El Motivo no puede exceder de 30 carácteres.', 'red');
                return;
            }
            if (Detalle.length > 30){
                showMessage('El Detalle no puede exceder de 30 carácteres.', 'red');
                return;
            }
            if (cedula && Nombres && Apellidos && Motivo && Detalle) {
                // Crear un objeto con los datos del cliente
                const cliente = {
                    codigo: clientesData.length + 1,
                    cedula: cedula,
                    Nombres: Nombres,
                    Apellidos: Apellidos,
                    Motivo:Motivo,
                    Detalle:Detalle,
                    conf: 'Modificar'
                    
                };
    
                // Agregar el cliente al array
                clientesData.push(cliente);
    
                // Actualizar la tabla
                updateTable();
                showMessage('Se ha insertado correctamente el motivo', 'green');
                limpiartodo();
    
            } else {
                alert('Completa todos los campos antes de agregar un motivo.');
            }
        });
    
        function updateTable() {
        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';
    
        // Rellenar la tabla con los datos de los clientes
            clientesData.forEach(function (cliente) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.cedula}</td>
                    <td>${cliente.Nombres}</td>
                    <td>${cliente.Apellidos}</td>
                    <td>${cliente.Motivo}</td>
                    <td>${cliente.Detalle}</td>
                    <td class="element__modifier">
                    <button class="botonMod botonMod-active" onclick="mostrarFormularioEdicion(${cliente.codigo})">${cliente.conf}</button>
                    </td>
                `;
    
                tableBody.appendChild(row);
            });
        }

       const EliminarBtn = document.getElementById('Eliminar');
    EliminarBtn.addEventListener('click', function () {
        eliminarPrimeraFila();
    });
    function eliminarPrimeraFila() {
        if (clientesData.length > 0) {
            // Elimina el primer elemento del array
            clientesData.shift();

            // Actualiza la tabla
            updateTable();
            showMessage('Se ha eliminado la primera fila correctamente', 'green');

        } else {
            showMessage('No hay filas para eliminar', 'red');
        }
    }


    // tableBody.addEventListener('click', function (event) {
    //     const target = event.target;
    //     if (target.classList.contains('botonMod')) {
    //         const row = target.closest('tr');
    //         const codigo = row.children[0].textContent;
    //         const nombre = row.children[1].textContent;
    //         console.log(nombre);
    //         console.log(codigo);
    //         const cedula = row.children[2].textContent;
    //         const direccion = row.children[3].textContent;
    //         const edad = row.children[4].textContent;
            
    //         mostrarFormularioEdicion(codigo);
    //     }
    // });

    window.mostrarFormularioEdicion = function(codigo) {
        const cliente = clientesData.find(cliente => cliente.codigo === codigo);
        // const cod = clientesData.find(cod=> cod.codigo === codigo); 
        console.log(cliente);
        document.getElementById('cedula').value = cliente.cedula;
        document.getElementById('nombres').value = cliente.Nombres;
        document.getElementById('apellidos').value = cliente.Apellidos;
        document.getElementById('mote').value = cliente.Motivo;
        document.getElementById('prueba').value = cliente.Detalle;

        // const tableBody = document.querySelector('.body__table');
        // document.getElementById('valornumber').value = cliente.valor;
        // const nuevoNombre = prompt('Editar Nombre:', nombre);
        // const nuevaCedula = prompt('Editar Cédula:', cedula);
        // const nuevaDireccion = prompt('Editar Dirección:', direccion);
        // const nuevaEdad = prompt('Editar Edad:', edad);



        // Actualizar los datos en el array
        // const index = clientesData.findIndex(cliente => cliente.codigo === parseInt(codigo));
        // if (index !== -1) {
        //     clientesData[index].nombre = nuevoNombre;
        //     clientesData[index].cedula = nuevaCedula;
        //     clientesData[index].direccion = nuevaDireccion;
        //     clientesData[index].edad = nuevaEdad;
        // }
        let btnGuardarcamb= document.getElementById('Guardar');

        btnGuardarcamb.onclick=function(){

        cliente.cedula = document.getElementById('cedula').value 
        cliente.Nombres = document.getElementById('nombres').value 
        cliente.Apellidos =document.getElementById('apellidos').value 
        cliente.Motivo = document.getElementById('mote').value
        cliente.Detalle =document.getElementById('prueba').value 
        
        updateTable();
        showMessage('Se ha modificado la fila correctamente', 'blue');
        limpiartodo();
        }
                // Actualizar la tabla 
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
    


