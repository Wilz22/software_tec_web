    const tableBody = document.querySelector('.body__table');
    //const contenedor = document.querySelector('.contenedor');
    let globalCobradorId; 

    document.getElementById('btnGuardar').addEventListener('click', updateCobrador);


    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('load', getCobradores());
        document.querySelector('#btnInsertar').addEventListener('click', addClientCobrador);
        const loggedInUser = localStorage.getItem('loggedInUser');
        document.getElementById('loggedInUserName').textContent = loggedInUser;

    });

    //COBRADOR
    function addClientCobrador() {
    // Obtener los valores de los campos de entrada
    const nombreCobrador = document.getElementById('nombreCobrador').value;
    const cedulaCobrador = document.getElementById('cedulaCobrador').value;
    const direccioncobrador = document.getElementById('direccioncobrador').value;

    // Crear el objeto de datos a enviar al servidor
    const data = {
        cedula: cedulaCobrador,  // <-- Possible mistake here, should this be cedulaCobrador?
        nombreCobrador: nombreCobrador,  // <-- Possible mistake here, should this be nombreCobrador?
        direccion: direccioncobrador,
    };

    // Realizar la solicitud POST al servidor
    fetch('http://localhost:5279/api/v1/CobradorCuentasCobrar', {
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
        getCobradores();
        insertMovementsJABD();
        })
        // .catch(error => {
        //     console.error('Error al intentar enviar los datos: ', error);
        // });
    }


    function getCobradores() {
        fetch('http://localhost:5279/api/v1/CobradorCuentasCobrar/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('.body__table');
            tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    
            data.forEach(cobrador => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${cobrador.nombreCobrador}</td>
                    <td>${cobrador.cedula}</td>
                    <td>${cobrador.direccion}</td>
                    <td>
                        <button aria-label="Eliminar" class="botonMod2 botonMod2-active" onclick="showOptions(${cobrador.id})">
                        Eliminar <aria-hidden="true"></i>
                        </button>
                    </td> 
                    <td>
                        <button aria-label="Editar" class="botonMod botonMod-active" onclick="showEditCobrador(${cobrador.id})">
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
            fetch(`http://localhost:5279/api/v1/CobradorCuentasCobrar/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.statusText);
                }
                getCobradores();
                showMessage('Se ha eliminado el cliente', 'red');
            })
            .catch(error => {
                console.error('Error al intentar eliminar el cliente: ', error);
                showMessage('Error al intentar eliminar el cliente', 'red');
            });
        }
    };

    //Función prueba
    function insertMovementsJABD(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    let nombre_activi_jabd = 'insercion'

    // Crear el objeto de datos a enviar al servidor
    const data = {
        nombreJabd: nombre_activi_jabd,
        usuarioJabd: loggedInUser,
    };
    // Realizar la solicitud POST al servidor
    fetch('http://localhost:5279/api/v1/JabdActividad', {
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
    })
    .catch(error => {
        console.error('Error al intentar enviar los datos: ', error);
    });
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
    


    //axaass
    function showEditCobrador(CobradorId) { 

        // Realizar una solicitud al servidor para obtener los datos del cliente por su ID
        fetch(`http://localhost:5279/api/v1/CobradorCuentasCobrar/${CobradorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(cobrador => {
            globalCobradorId=cobrador.id;
            // Llenar los campos del modal con los datos del cliente
            document.getElementById('cedulaCobrador').value = cobrador.cedula;
            document.getElementById('nombreCobrador').value = cobrador.nombreCobrador;
            document.getElementById('direccioncobrador').value = cobrador.direccion;

        })
        .catch(error => {
            console.error('Error al obtener los datos del cliente: ', error);
        });
    }


    function updateCobrador() {
        console.log(globalCobradorId);
        const cedula = document.getElementById('cedulaCobrador').value;
        const nombreCobrador = document.getElementById('nombreCobrador').value;
        const direccion = document.getElementById('direccioncobrador').value;
    
        const data = {
            id: globalCobradorId,
            cedula: cedula,
            nombreCobrador: nombreCobrador,
            direccion: direccion,
        };
    
        fetch(`http://localhost:5279/api/v1/CobradorCuentasCobrar/${globalCobradorId}`, {
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
            getCobradores();
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
        