document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('.body__table');
    // Agregar un evento de click al botón

    const agregarClienteBtn = document.getElementById('agregarCliente');
    

    agregarClienteBtn.addEventListener('click', addClient);
    window.addEventListener('load', getClientes());



    // btnfilter.addEventListener("click", () => {
    //     document.querySelector(".filter-menu").classList.toggle("active")
    // }); 
   
    // agregarClienteBtn.addEventListener('click', function () {
    //     const ruc = rucInput.value;
    //     const nombres = nombresInput.value;
    //     const direccion = direccionInput.value;
    //     // const valor= valorInput.value;
    //     var valorInput = document.getElementById('valornumber').value;
    //     var valorNum=parseFloat(valorInput);
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
    //         document.getElementById('valornumber').value = 0; 
    //     } else {
    //         alert('Completa todos los campos antes de agregar un cliente.');
    //     }
    // });
});

function addClient() {
    // Obtener los valores de los campos de entrada
    const ruc = document.getElementById('rucInput').value;
    const nombre = document.getElementById('nombreInput').value;
    const apellido = document.getElementById('apellidoInput').value;
    const direccion = document.getElementById('direccionInput').value;

    // Crear el objeto de datos a enviar al servidor
    const data = {
        ruc: ruc,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
    };
    // Realizar la solicitud POST al servidor
    fetch('http://localhost:5279/api/v1/ClientsFac', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Aquí obtienes los datos del cliente agregado
        // Actualizar la tabla para mostrar el cliente recién agregado
        getClientes();
    })
    .catch(error => {
        console.error('Error al intentar enviar los datos: ', error);
    });
}

// Función para obtener y mostrar los clientes en la tabla
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

        data.forEach(cliente => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${cliente.ruc}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button aria-label="Eliminar" class="btn" onclick="showOptions(${cliente.id})">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td> 
                <td>
                    <button aria-label="Editar" class="btn" onclick="fillFormFields(${JSON.stringify(cliente)})">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
            
                </td>
            `;
            tbody.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error al intentar obtener los clientes: ', error);
    });
}
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
            getClientes();
            showMessage('Se ha eliminado el cliente', 'red');
        })
        .catch(error => {
            console.error('Error al intentar eliminar el cliente: ', error);
            showMessage('Error al intentar eliminar el cliente', 'red');
        });
    }
};
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

function fillFormFields(cliente) {
    document.getElementById('clienteId').value = cliente.id;
    document.getElementById('rucInput').value = cliente.ruc;
    document.getElementById('nombreInput').value = cliente.nombre;
    document.getElementById('apellidoInput').value = cliente.apellido;
    document.getElementById('direccionInput').value = cliente.direccion;
}


function updateClient() {
    const clienteId = document.getElementById('clienteId').value;
    const ruc = document.querySelector('input[name="Ruc"]').value;
    const nombres = document.querySelector('input[name="Nombres"]').value;
    const apellidos = document.querySelector('input[name="Apellidos"]').value;
    const direccion = document.querySelector('input[name="Direccion"]').value;

    const data = {
        ruc: ruc,
        nombre: nombres,
        apellido: apellidos,
        direccion: direccion
    };

    fetch(`http://localhost:5279/api/v1/ClientsFac/${clienteId}`, {
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
        showMessage('Cliente actualizado correctamente', 'green');
        // Puedes agregar aquí lógica adicional, como actualizar la tabla de clientes, etc.
    })
    .catch(error => {
        console.error('Error al intentar actualizar el cliente: ', error);
        showMessage('Error al intentar actualizar el cliente', 'red');
    });
}

