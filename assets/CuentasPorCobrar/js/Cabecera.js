const tableBody = document.querySelector('.body__table1');

document.getElementById('btnGuardar').addEventListener('click', updateFactura);
document.getElementById('btnGuardar2').addEventListener('click', updateDetalle);
let globalFacturaId; 
let globalDetalleId;

document.addEventListener('DOMContentLoaded', function () {
document.querySelector('#btnInsertar').addEventListener('click', addFactura);
document.querySelector('#btnInsertar2').addEventListener('click', addDetalle);
window.addEventListener('load', getFactura());
window.addEventListener('load', getDetalle());
const loggedInUser = localStorage.getItem('loggedInUser');
document.getElementById('loggedInUserName').textContent = loggedInUser;
});

                                                /*FACTURAS*/

//COBRADOR
function addFactura() {
// Obtener los valores de los campos de entrada
const numF = document.getElementById('numF').value;
const fechaF = document.getElementById('fechaF').value;
const valorF = document.getElementById('valorF').value;
const clientF = document.getElementById('clientF').value;


// Crear el objeto de datos a enviar al servidor
const data = {
    numeroFactura: numF,  
    fechaFactura: fechaF,  
    valorFactura: valorF,  
    clienteFactura: clientF,
    fechaDetalle: null,
    valorDetalle: null,
    cobradorDetalle: null,
    metodoDetalle: null

};
const dataJSON= JSON.stringify(data);
console.log(dataJSON);
// Realizar la solicitud POST al servidor
fetch('http://localhost:5279/api/v1/CabeceraCXC', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: dataJSON,
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
    getFactura();
    })
    // .catch(error => {
    //     console.error('Error al intentar enviar los datos: ', error);
    // });
}


function getFactura() {
    fetch('http://localhost:5279/api/v1/CabeceraCXC/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('.body__table');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas

        data.forEach(factura => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${factura.numeroFactura}</td>
                <td>${factura.fechaFactura}</td>
                <td>${factura.valorFactura}</td>
                <td>${factura.clienteFactura}</td>                
                <td>
                    <button aria-label="Eliminar" class="botonMod2 botonMod2-active" onclick="showOptions(${factura.id})">
                    Eliminar <aria-hidden="true"></i>
                    </button>
                </td> 
                <td>
                    <button aria-label="Editar" class="botonMod botonMod-active" onclick="showEditCabecera(${factura.id})">
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
        fetch(`http://localhost:5279/api/v1/CabeceraCXC/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            getFactura();
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
function showEditCabecera(FacturaId) { 

    // Realizar una solicitud al servidor para obtener los datos del cliente por su ID
    fetch(`http://localhost:5279/api/v1/CabeceraCXC/${FacturaId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json();
    })
    .then(factura => {
        globalFacturaId=factura.id;
        // Llenar los campos del modal con los datos del cliente
        document.getElementById('numF').value = factura.numeroFactura;
        document.getElementById('fechaF').value = factura.fechaFactura;
        document.getElementById('valorF').value = factura.valorFactura;
        document.getElementById('clientF').value = factura.clienteFactura;

    })
    .catch(error => {
        console.error('Error al obtener los datos del cliente: ', error);
    });
}

function updateFactura() {
    console.log(globalFacturaId);
    const numeroFactura = document.getElementById('numF').value;
    const fechaFactura = document.getElementById('fechaF').value;
    const valorFactura = document.getElementById('valorF').value;
    const clienteFactura = document.getElementById('clientF').value;

    const data = {
        id: globalFacturaId,
        numeroFactura: numeroFactura,
        fechaFactura: fechaFactura,
        valorFactura: valorFactura,
        clienteFactura: clienteFactura,
    };

    fetch(`http://localhost:5279/api/v1/CabeceraCXC/${globalFacturaId}`, {
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
        getFactura();
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
    


                                                /*DETALLE DEL PAGO*/

//COBRADOR
function addDetalle() {
    
    // Obtener los valores de los campos de entrada
    const fechapago = document.getElementById('fechapago').value;
    const valorpago = document.getElementById('valorpago').value;
    const clientepago = document.getElementById('clientepago').value;
    const metodopago = document.getElementById('metodopago').value;
    
    
    // Crear el objeto de datos a enviar al servidor
    const data = {
        numeroFactura: null,  
        fechaFactura: null,  
        valorFactura: null,  
        clienteFactura: null,
        fechaDetalle: fechapago,
        valorDetalle: valorpago,
        cobradorDetalle: clientepago,
        metodoDetalle: metodopago
    
    };
    const dataJSON= JSON.stringify(data);
    console.log(dataJSON);
    // Realizar la solicitud POST al servidor
    fetch('http://localhost:5279/api/v1/CabeceraCXC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dataJSON,
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
        getDetalle();
        })
        // .catch(error => {
        //     console.error('Error al intentar enviar los datos: ', error);
        // });
    }
    
    
    function getDetalle() {
        fetch('http://localhost:5279/api/v1/CabeceraCXC/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('.body__table');
            tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    
            data.forEach(detalle => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${detalle.fechaDetalle}</td>
                    <td>${detalle.valorDetalle}</td>
                    <td>${detalle.cobradorDetalle}</td>
                    <td>${detalle.metodoDetalle}</td>                
                    <td>
                        <button aria-label="Eliminar" class="botonMod2 botonMod2-active" onclick="showOptions(${detalle.id})">
                        Eliminar <aria-hidden="true"></i>
                        </button>
                    </td> 
                    <td>
                        <button aria-label="Editar" class="botonMod botonMod-active" onclick="showEditDetalle(${detalle.id})">
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
            fetch(`http://localhost:5279/api/v1/CabeceraCXC/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.statusText);
                }
                getDetalle();
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
    function showEditDetalle(DetalleId) { 
    
        // Realizar una solicitud al servidor para obtener los datos del cliente por su ID
        fetch(`http://localhost:5279/api/v1/CabeceraCXC/${DetalleId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(detalle => {
            globalDetalleId=detalle.id;
            // Llenar los campos del modal con los datos del cliente
            document.getElementById('fechapago').value = detalle.fechaDetalle;
            document.getElementById('valorpago').value = detalle.valorDetalle;
            document.getElementById('clientepago').value = detalle.cobradorDetalle;
            document.getElementById('metodopago').value = detalle.metodoDetalle;
    
        })
        .catch(error => {
            console.error('Error al obtener los datos del cliente: ', error);
        });
    }
    
    function updateDetalle() {
        console.log(globalDetalleId);
        const fechaDetalle = document.getElementById('fechapago').value;
        const valorDetalle = document.getElementById('valorpago').value;
        const cobradorDetalle = document.getElementById('clientepago').value;
        const metodoDetalle = document.getElementById('metodopago').value;
    
        const data = {
            id: globalDetalleId,
            fechaDetalle: fechaDetalle,
            valorDetalle: valorDetalle,
            cobradorDetalle: cobradorDetalle,
            metodoDetalle: metodoDetalle,
        };
    
        fetch(`http://localhost:5279/api/v1/CabeceraCXC/${globalDetalleId}`, {
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
            getDetalle();
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