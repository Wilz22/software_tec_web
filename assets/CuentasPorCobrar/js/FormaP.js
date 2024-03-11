const tableBody = document.querySelector('.body__table');
let globalFormaPagoId; 


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#btnInsertar').addEventListener('click', addFormaPago);
    document.getElementById('btnGuardar').addEventListener('click', updateFormaPago);
    window.addEventListener('load', getFormaPago());
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
});

//COBRADOR
function addFormaPago() {
// Obtener los valores de los campos de entrada
const codigoInput = document.getElementById('codigoInput').value;
const metodoPagoInput = document.getElementById('metodoPagoInput').value;

// Crear el objeto de datos a enviar al servidor
const data = {
    codigo: codigoInput,  
    nombreForma: metodoPagoInput, 
    createdAt: "2024-03-11T02:14:39.837"
 
};

// Realizar la solicitud POST al servidor
fetch('http://localhost:5279/api/v1/FormaDePagoCXC', {
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
    getFormaPago();
    })
    // .catch(error => {
    //     console.error('Error al intentar enviar los datos: ', error);
    // });
}


function getFormaPago() {
    fetch('http://localhost:5279/api/v1/FormaDePagoCXC/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('.body__table');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas

        data.forEach(formaPago => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${formaPago.codigo}</td>
                <td>${formaPago.nombreForma}</td>
                <td>
                    <button aria-label="Eliminar" class="botonMod2 botonMod2-active" onclick="showOptions(${formaPago.id})">
                    Eliminar <aria-hidden="true"></i>
                    </button>
                </td> 
                <td>
                    <button aria-label="Editar" class="botonMod botonMod-active" onclick="showEditFormaPago(${formaPago.id})">
                       Modificar <aria-hidden="true"></i>
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
        fetch(`http://localhost:5279/api/v1/FormaDePagoCXC/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            getFormaPago();
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

//axaass
function showEditFormaPago(FormaPagoId) { 

    // Realizar una solicitud al servidor para obtener los datos del cliente por su ID
    fetch(`http://localhost:5279/api/v1/FormaDePagoCXC/${FormaPagoId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(formaPago => {
        globalFormaPagoId=formaPago.id;
        // Llenar los campos del modal con los datos del cliente
        document.getElementById('codigoInput').value = formaPago.codigo;
        document.getElementById('metodoPagoInput').value = formaPago.nombreForma;

    })
    .catch(error => {
        console.error('Error al obtener los datos del cliente: ', error);
    });
}


function updateFormaPago() {
    console.log(globalFormaPagoId);
    const codigo = document.getElementById('codigoInput').value;
    const nombreForma = document.getElementById('metodoPagoInput').value;

    const data = {
        id: globalFormaPagoId,
        codigo: codigo,
        nombreForma: nombreForma,
    };

    fetch(`http://localhost:5279/api/v1/FormaDePagoCXC/${globalFormaPagoId}`, {
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
        getFormaPago();
        showMessage('Cliente actualizado correctamente', 'green');
        // Puedes agregar aquí lógica adicional, como actualizar la tabla de clientes, etc.
    })
    .catch(error => {
        console.error('Error al intentar actualizar el cliente: ', error);
        showMessage('Error al intentar actualizar el cliente', 'red');
    });
}

$(document).ready(function(){
    $("#barrabusqueda").keyup(function(){
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
    