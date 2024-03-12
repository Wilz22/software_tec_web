let selectedIdCiudad = null;
let selectedRuc = null;
let selectedOficialRuc=null;
let selectNameCiudad =null;

window.addEventListener('load', function() {
    traeRucs();
    traeCiudades();
    //getClientes();
});
function limpiarcampos(){  
    document.getElementById('fechaInput').value = '';
    document.getElementById('ruc').value = '';
    document.getElementById('nombres').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('ciudadesList').value = '';
    document.getElementById('fechaInput').value = '';
}

function cambiosGuardados(){

    showMessage('Registros insertados con exito','green');

}


document.addEventListener('DOMContentLoaded', function () {
    const agregarClienteBtn = document.getElementById('agregarCliente');
    // const rucInput = document.querySelector('.campo:nth-child(1) input');
    // const nombresInput = document.querySelector('.campo:nth-child(2) input');
    // const direccionInput = document.querySelector('.campo:nth-child(3) input');
    const tableBody = document.querySelector('.body__table');
    const clientesData = [];
    const btnfilter= document.getElementById("filter-button");
 

    // btnfilter.addEventListener("click", () => {
    //     document.querySelector(".filter-menu").classList.toggle("active")
    // }); 
   
    // agregarClienteBtn.addEventListener('click', function () {
    //     const fecha=document.getElementById('fechaInput').value;
    //     const ruc = document.getElementById('ruc').value;
    //     const nombres = document.getElementById('nombres').value;
    //     const direccion = document.getElementById('direccion').value;
    //     // const valor= valorInput.value;
    //     const valorInput = document.getElementById('ciudadesList').value;
    //     const valorNum=valorInput;
    //     //console.log(valorNum);
    //     // Validaciones
    //     if (ruc.length !== 13) {
    //         alert('El RUC debe tener 13 dígitos.');
    //         return;
    //     }

    //     if (nombres.length > 20) {
    //         alert('El nombre no puede exceder los 20 caracteres.');
    //         return;
    //     }
    //     if (valorNum<1000 || valorNum>=1500){
    //         showMessage('El campo valor digitado en el campo Valor, no se encuentra dentro del rango comprendido entre 1000 a 1500', 'red');
    //         //alert('El campo valor digitado en el campo Valor, no se encuentra dentro del rango comprendido entre 1000 a 1500')
    //         return;
    //     }

    //     if (ruc && nombres && direccion && valorNum) {
    //         // Crear un objeto con los datos del cliente
    //         const cliente = {
    //             codigo: clientesData.length + 1,
    //             fecha:fecha,
    //             ruc: ruc,
    //             nombres: nombres,
    //             direccion: direccion,
    //             valor:valorNum,
    //             // estado: 'Activo',
    //         };
            
    //         // Agregar el cliente al array
    //         clientesData.push(cliente);

    //         // Actualizar la tabla
    //         updateTable();

    //         showMessage('Se ha insertado correctamente el Cliente', 'green');
    //         limpiarcampos();


    //     } else {
    //         alert('Completa todos los campos antes de agregar un cliente.');
    //     }
    // });

    // function updateTable() {
    //     // Limpiar el cuerpo de la tabla
    //     tableBody.innerHTML = '';

    //     clientesData.forEach(function (cliente) {
    //         const row = document.createElement('tr');
    //         row.innerHTML = `
    //             <td>${cliente.fecha}</td>
    //             <td>${cliente.ruc}</td>
    //             <td>${cliente.nombres}</td>
    //             <td>${cliente.direccion}</td>
    //             <td>${cliente.valor}</td>
    //             <td>
    //                 <button aria-label="Eliminar" class="btn" onclick="showOptions(${cliente.codigo})">
    //                     <i class="fa fa-trash" aria-hidden="true"></i>
    //                 </button>
    //             </td>
    //             <td>
    //                 <button aria-label="Editar" class="btn" onclick="showEdit(${cliente.codigo})">
    //                     <i class="fa fa-pencil" aria-hidden="true"></i>
    //                 </button>
    //             </td>
    //         `;

    //         tableBody.appendChild(row);
    //     });
    // }

    // window.showEdit = function (codigo) {
    //     const cliente = clientesData.find(cliente => cliente.codigo === codigo);
    //     //console.log(cliente);
    //     // Llenar el formulario con los datos del cliente

    //     document.getElementById('fechaInput').value = cliente.fecha;
    //     document.getElementById('ruc').value = cliente.ruc;
    //     document.getElementById('nombres').value = cliente.nombres;
    //     document.getElementById('direccion').value = cliente.direccion;
    //     document.getElementById('ciudadesList').value = cliente.valor;

    //     // Actualizar el formulario para reflejar el modo de edición
    //     document.getElementById('agregarCliente').style.display = 'none'; // Ocultar botón de agregar
    //     // Puedes mostrar u ocultar otros elementos según tus necesidades

    //     // Obtener el botón existente o crear uno nuevo si no existe
    //     let guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
    //     if (!guardarCambiosBtn) {
    //         guardarCambiosBtn = document.createElement('button');
    //         guardarCambiosBtn.id = 'guardarCambiosBtn';
    //         // guardarCambiosBtn.textContent = 'Guardar Cambios';
    //         guardarCambiosBtn.classList.add('action-button');
    //         guardarCambiosBtn.innerHTML += 'Guardar Cambios';
    //         const iconoPencil = document.createElement('i');
    //         iconoPencil.classList.add('fa', 'fa-pencil-alt');
    //         guardarCambiosBtn.appendChild(iconoPencil);

    //         document.querySelector('.dashboard__main-actions-buttons').appendChild(guardarCambiosBtn);
    //     }

    //     guardarCambiosBtn.onclick = function () {
    //     document.getElementById('guardarCambiosBtn').style.display = 'block';
    //     // Actualizar los datos del cliente en el array
    //     cliente.fecha =document.getElementById('fechaInput').value
    //     cliente.ruc = document.getElementById('ruc').value
    //     cliente.nombres = document.getElementById('nombres').value
    //     cliente.direccion =document.getElementById('direccion').value
    //     cliente.valor = document.getElementById('ciudadesList').value 

    //     // Puedes agregar más lógica de validación según tus necesidades

    //     // Después de la actualización, volver a mostrar el botón de agregar y limpiar el formulario
    //     document.getElementById('agregarCliente').style.display = 'block';
    //     limpiarcampos();

    //     document.getElementById('guardarCambiosBtn').style.display = 'none';

    //     // Actualizar la tabla
    //     updateTable();
    //     showMessage('Cambios Guardados','violet')
    //     };
    // };

    
 

});


//funcion que se conecta con el backend
function traeRucs(){
    // Realiza una solicitud al servidor para obtener la información necesaria
    fetch('http://localhost:5279/api/v1/ClientsFac/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const rucList = document.getElementById('rucList'); // Obtener el elemento select
            // Llenar el dropdown con opciones basadas en el campo ruc de los clientes
            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id; // Usar el id como valor de la opción
                option.textContent = cliente.ruc;
                rucList.appendChild(option);
            });
            
            // Agregar un evento onchange para capturar el ruc seleccionado
            rucList.addEventListener('change', function() {
                // Guardar el ID y el nombre del RUC seleccionado en las variables globales
                selectedRuc = this.value;
                selectedOficialRuc = this.options[this.selectedIndex].text; // Obtener el texto de la opción seleccionada
                console.log('RUC seleccionado:', selectedRuc, selectedOficialRuc);
                llenaCamposSegunRuc(selectedRuc);
            });
        })
        .catch(error => {
            console.error('Error al obtener la información del servidor:', error);
        });
};
//funcion que se conecta con el backend
function llenaCamposSegunRuc(selectedRuc){

    fetch(`http://localhost:5279/api/v1/ClientsFac/${selectedRuc}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(cliente => {
        // globalClientId=cliente.id;
        // Llenar los campos del modal con los datos del cliente
        document.getElementById('nombres').value = cliente.nombre;
        document.getElementById('apellido').value = cliente.apellido;
        document.getElementById('direccion').value = cliente.direccion;
        const fechaFormateada=formatFecha(cliente.timeCli);
        console.log(fechaFormateada);
        document.getElementById('fechaInput').value = fechaFormateada;
        document.getElementById('ciudadesList').value = cliente.ciudadEntrFacId;
    });


};

//funcion que trae las ciudades
function traeCiudades() {
    // Realiza una solicitud al servidor para obtener la información necesaria
    fetch('http://localhost:5279/api/v1/CiudadEntrFac/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const ciudadesList = document.getElementById('ciudadesList'); // Obtener el elemento select
            // Llenar el dropdown con opciones basadas en el campo ruc de los clientes
            data.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.id; // Usar el id como valor de la opción
                option.textContent = ciudad.ciudadEntrega;
                ciudadesList.appendChild(option);
            });

            // Agregar un evento onchange para capturar la ciudad seleccionada
            ciudadesList.addEventListener('change', function() {
                // Guardar el ID y el nombre de la ciudad seleccionada en las variables globales
                selectedIdCiudad = this.value;
                selectNameCiudad = this.options[this.selectedIndex].text; // Obtener el texto de la opción seleccionada
                console.log('Ciudad Seleccionada:', selectedIdCiudad, selectNameCiudad);
            });
        })
        .catch(error => {
            console.error('Error al obtener la información del servidor:', error);
        });
}


// const fechaHoy = new Date().toISOString().split('T')[0];

//         // Establece la fecha por defecto en el campo de entrada de fecha
//         document.getElementById('fechaInput').value = fechaHoy;

function agregarFila() {
        const tbody = document.querySelector('.body__table-voucher');

        // Crear una nueva fila
        const nuevaFila = document.createElement('tr');
        nuevaFila.dataset.id = '156432';

        // Añadir celdas a la nueva fila
        for (let i = 0; i < 5; i++) {
            const nuevaCelda = document.createElement('td');
            if (i === 0) {
                nuevaCelda.textContent = tbody.children.length + 1;
            } else {
                const nuevoInput = document.createElement('input');
                nuevoInput.type = 'text';
                nuevoInput.classList.add('input-bar');
                if (i === 3 || i === 4) {
                    nuevoInput.placeholder = '0';
                } else if (i === 1) {
                    nuevoInput.placeholder = 'Descripción';
                    nuevoInput.classList.add('input-contact');
                }
                nuevaCelda.appendChild(nuevoInput);
            }
            nuevaFila.appendChild(nuevaCelda);
        }

        // Añadir botón de eliminar
        const nuevoBoton = document.createElement('button');
        nuevoBoton.classList.add('btn', 'btn-inactive', 'btn-delete-row');
        nuevoBoton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        nuevoBoton.addEventListener('click', function () {
            eliminarFila(this);
        });
        const celdaBoton = document.createElement('td');
        celdaBoton.appendChild(nuevoBoton);
        nuevaFila.appendChild(celdaBoton);

        // Añadir la nueva fila al tbody
        tbody.appendChild(nuevaFila);
    }
// Función para eliminar una fila
// Función para eliminar una fila y el registro correspondiente en la base de datos
async function eliminarFila(boton) {
    const filaAEliminar = boton.closest('tr');
    const id = filaAEliminar.dataset.id; 
    console.log('el id es',id);// Supongamos que el ID del registro está almacenado en un atributo de datos en la fila

    // Eliminar la fila de la tabla
    filaAEliminar.remove();

    // try {
        // Enviar una solicitud al servidor para eliminar el registro de la base de datos
        const response = await fetch(`http://localhost:5279/api/v1/FacturacionCliente/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el registro de la base de datos');
        }

        // Registro eliminado correctamente
        console.log('Registro eliminado correctamente');
    //  }
    //  catch (error) {
    //     console.error('Error al eliminar el registro:', error);
    //     // Aquí puedes manejar el error de acuerdo a tus necesidades
    // }
}


// function updateTable(clientes) {
//     // Limpiar el cuerpo de la tabla
//     var tableBody = document.querySelector('.body__table');
//     tableBody.innerHTML = '';

//     clientes.forEach(function (cliente) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${cliente.fecha}</td>
//             <td>${cliente.ruc}</td>
//             <td>${cliente.nombres}</td>
//             <td>${cliente.direccion}</td>
//             <td>${cliente.valor}</td>
//             <td>
//                 <button aria-label="Eliminar" class="btn" onclick="showOptions(${cliente.codigo})">
//                     <i class="fa fa-trash" aria-hidden="true"></i>
//                 </button>
//             </td>
//             <td>
//                 <button aria-label="Editar" class="btn" onclick="showEdit(${cliente.codigo})">
//                     <i class="fa fa-pencil" aria-hidden="true"></i>
//                 </button>
//             </td>
//         `;

//         tableBody.appendChild(row);
//     });
// }
//envia datos de la tabla
function enviarDatosTabla() {
    const datos = obtenerDatosTabla();


    // Convertir el array de objetos a una cadena JSON
    const datosJSON = JSON.stringify(datos);
    console.log('los datos son:', datosJSON);

    // Enviar los datos al servidor a través de una solicitud POST
    fetch('http://localhost:5279/api/v1/FacturacionCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosJSON,// Aquí se pasa la cadena JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
    })
    .then(datosJSON => {
        console.log('Datos insertados correctamente:', datosJSON);
        //showMessage('Datos ingresados correctamente','green');

        // Aquí puedes agregar cualquier lógica adicional después de insertar los datos
    })
    // .catch(error => {
    //     console.error('Error al insertar los datos:', error);
    // });
}

//obtiene los datos de la tabla
function obtenerDatosTabla() {
    const tbody = document.querySelector('.body__table-voucher');
    const filas = tbody.querySelectorAll('tr');
    const datos = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        const filaDatos = {};
        const traeIdCliente= document.getElementById('rucList').value;
        console.log(traeIdCliente);
        // Obtener los datos de cada celda de la fila
        filaDatos.id = parseInt(traeIdCliente); // Ajusta este valor según corresponda
        filaDatos.descripcionProd = celdas[1].querySelector('input').value;
        filaDatos.cantidadProd = parseInt(celdas[2].querySelector('input').value);
        filaDatos.precioUnitario = parseInt(celdas[3].querySelector('input').value);
        filaDatos.precioTotal = parseInt(celdas[4].querySelector('input').value);

        // Agregar los datos de la fila al arreglo
        datos.push(filaDatos);
    });

    //console.log(datos); // Imprimir el array de datos en la consola
    return datos;
}

//funcion para buscar en la tabla
$(document).ready(function(){
    $("#searchInput").keyup(function(){
        var searchText = $(this).val().toLowerCase();
        $("#table tbody tr").each(function(){
            var rowText = $(this).text().toLowerCase();
            if(rowText.indexOf(searchText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
}); 
//establecer la fecha predefinida
function formatFecha(fechaString) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaString);
    // Obtener los componentes de la fecha (año, mes, día)
    const year = fecha.getFullYear();
    // Añadir ceros a la izquierda si es necesario
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    // Devolver la fecha formateada en el formato deseado
    return `${year}-${month}-${day}`;
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

function updateDetails() {
    console.log(selectedRuc);
    const datos= obtenerDatosTabla();
    const datosJSON = JSON.stringify(datos);
    console.log('los datos son:', datosJSON);

    fetch(`http://localhost:5279/api/v1/FacturacionCliente/${selectedRuc}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: datosJSON,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        showMessage('Cliente actualizado correctamente', 'green');
        // Puedes agregar aquí lógica adicional, como actualizar la tabla de clientes, etc.
    })
    .catch(error => {
        console.error('Error al intentar actualizar el cliente: ', error);
        showMessage('Error al intentar actualizar el cliente', 'red');
    });
}

window.showOptions = function () {
    const result = confirm("¿Desea eliminar este cliente?");
    if (result) {
        // Hacer la solicitud DELETE al backend para eliminar el cliente
        fetch(`http://localhost:5279/api/v1/ClientsFac/${selectedRuc}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            showMessage('Se ha eliminado el cliente', 'red');
            // Recargar la página después de un breve retraso
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Tiempo de espera en milisegundos antes de recargar la página
        })
        .catch(error => {
            console.error('Error al intentar eliminar el cliente: ', error);
            showMessage('Error al intentar eliminar el cliente', 'red');
        });
    }
};
        