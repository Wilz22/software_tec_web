let selectedIdCiudad = null;
let selectedRuc = null;
let selectedOficialRuc=null;
let selectNameCiudad =null;
window.addEventListener('load', function() {
    traeRucs();
    traeCiudades();
    getClientes();
});

const agregarCiudadClient = document.getElementById('agregaCiudadCliente');
agregarCiudadClient.addEventListener('click', updateClient);

document.addEventListener('DOMContentLoaded', function () {
    const agregarClienteBtn = document.getElementById('agregarCliente');
    const rucInput = document.querySelector('.campo:nth-child(1) input');
    const nombresInput = document.querySelector('.campo:nth-child(2) input');
    const direccionInput = document.querySelector('.campo:nth-child(3) input');
    const tableBody = document.querySelector('.body__table');
    const clientesData = [];


    // btnfilter.addEventListener("click", () => {
    //     document.querySelector(".filter-menu").classList.toggle("active")
    // }); 
   
    // agregarClienteBtn.addEventListener('click', function () {
    //     const ruc = rucInput.value;
    //     const nombres = nombresInput.value;
    //     const direccion = direccionInput.value;
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
    //         rucInput.value = '';
    //         nombresInput.value = '';
    //         direccionInput.value = '';
    //         document.getElementById('ciudadesList').value = ''; 
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

    // window.showOptions = function (codigo) {
    //     const result = confirm("¿Desea eliminar este cliente?");
    //     if (result) {

    //         const index = clientesData.findIndex(cliente => cliente.codigo === codigo);

    //         clientesData.splice(index, 1);

    //         // Actualizar la tabla
    //         updateTable();
    //         showMessage('Se ha eliminado el cliente', 'red');
    //     }
        
    // };

    // window.showEdit = function (codigo) {
    //     const cliente = clientesData.find(cliente => cliente.codigo === codigo);
    //     //console.log(cliente);
    //     // Llenar el formulario con los datos del cliente
    //     document.querySelector('.campo:nth-child(1) input').value = cliente.ruc;
    //     document.querySelector('.campo:nth-child(2) input').value = cliente.nombres;
    //     document.querySelector('.campo:nth-child(3) input').value = cliente.direccion;
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
    //     cliente.ruc = document.querySelector('.campo:nth-child(1) input').value;
    //     cliente.nombres = document.querySelector('.campo:nth-child(2) input').value;
    //     cliente.direccion = document.querySelector('.campo:nth-child(3) input').value;
    //     cliente.valor = document.getElementById('ciudadesList').value;

    //     // Puedes agregar más lógica de validación según tus necesidades

    //     // Después de la actualización, volver a mostrar el botón de agregar y limpiar el formulario
    //     document.getElementById('agregarCliente').style.display = 'block';
    //     document.querySelector('.campo:nth-child(1) input').value = '';
    //     document.querySelector('.campo:nth-child(2) input').value = '';
    //     document.querySelector('.campo:nth-child(3) input').value = '';
    //     document.getElementById('ciudadesList').value = '';

    //     document.getElementById('guardarCambiosBtn').style.display = 'none';

    //     // Actualizar la tabla
    //     updateTable();
    //     showMessage('Cambios Guardados','violet')
    //     };
    // };
});

function getClientes() {
    fetch('http://localhost:5279/api/v1/ClientsFac/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('.body__table');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas

        // Obtener los nombres de las ciudades correspondientes a los IDs
        fetch('http://localhost:5279/api/v1/CiudadEntrFac/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.statusText);
                }
                return response.json();
            })
            .then(ciudades => {
                // Crear un mapa de ID de ciudad a nombre de ciudad
                const ciudadesMap = {};
                ciudades.forEach(ciudad => {
                    ciudadesMap[ciudad.id] = ciudad.ciudadEntrega;
                });

                // Iterar sobre los clientes y agregar filas a la tabla
                data.forEach(cliente => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${cliente.ruc}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido}</td>
                        <td>${cliente.direccion}</td>
                        <td>${ciudadesMap[cliente.ciudadEntrFacId]}</td>
                        <td>
                            <button aria-label="Eliminar" class="btn" onclick="showOptions(${cliente.id})">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </td> 
                        <td>
                            <button aria-label="Editar" class="btnEditarModal" onclick="showEditModal(${cliente.id})">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(newRow);
                });
            })
            .catch(error => {
                console.error('Error al intentar obtener los nombres de las ciudades: ', error);
            });
    })
    .catch(error => {
        console.error('Error al intentar obtener los clientes: ', error);
    });
}


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
        document.getElementById('nombreClassCiudad').value = cliente.nombre;
        document.getElementById('apellidoClassCiudad').value = cliente.apellido;
        document.getElementById('direccionClassCiudad').value = cliente.direccion;
    });


};
//funcion que añade las ciudades de la bd a un dropdownbutton
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



function updateClient() {
    console.log(selectedRuc);
    console.log(selectedIdCiudad);
    const ruc = document.getElementById('rucList').value;
    console.log(ruc);
    const nombre = document.getElementById('nombreClassCiudad').value;
    const apellido = document.getElementById('apellidoClassCiudad').value;
    const direccion = document.getElementById('direccionClassCiudad').value;

    const data = {
        id: selectedRuc,
        ruc: selectedOficialRuc,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        ciudadEntrFacId: selectedIdCiudad
    };

    fetch(`http://localhost:5279/api/v1/ClientsFac/${selectedRuc}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        showMessage('Ciudad Ingresada correctamente', 'green');
        getClientes();
        limpiarInputs();        // Puedes agregar aquí lógica adicional, como actualizar la tabla de clientes, etc.
    })
    .catch(error => {
        console.error('Error al intentar actualizar el cliente: ', error);
        showMessage('Error al intentar actualizar el cliente', 'red');
    });
}

function toggleCodigoDiv() {
    const codigoDiv = document.getElementById('codigoDiv');
    const mostrarCodigoCheckbox = document.getElementById('mostrarCodigo');

    if (mostrarCodigoCheckbox.checked) {
        codigoDiv.style.display = 'block';
    } else {
        codigoDiv.style.display = 'none';
    }
};
// const fechaHoy = new Date().toISOString().split('T')[0];

//         // Establece la fecha por defecto en el campo de entrada de fecha
//         document.getElementById('fechaInput').value = fechaHoy;

function showMessage(message, backgroundColor) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.style.backgroundColor = backgroundColor;
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}; 

window.showOptions = function (id) {
    const result = confirm("¿Desea eliminar este cliente?");
    if (result) {
        // Hacer la solicitud DELETE al backend para eliminar el cliente
        fetch(`http://localhost:5279/api/v1/ClientsFac/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            showMessage('Se ha eliminado el cliente', 'red');
            getClientes();
            limpiarInputs();

        })
        .catch(error => {
            console.error('Error al intentar eliminar el cliente: ', error);
            showMessage('Error al intentar eliminar el cliente', 'red');
        });
    }
};

function limpiarInputs(){

    document.getElementById('rucList').value='';
    document.getElementById('nombreClassCiudad').value='';
    document.getElementById('apellidoClassCiudad').value='';
    document.getElementById('direccionClassCiudad').value='';
    document.getElementById('ciudadesList').value='';
    };