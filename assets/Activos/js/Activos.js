// Array para almacenar los datos de activos

    document.addEventListener('DOMContentLoaded', function () {
        const loggedInUser = localStorage.getItem('loggedInUser');
        document.getElementById('loggedInUserName').textContent = loggedInUser;
        
    });
var activos = [];

function addTblActivos() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let nombreActivoJnmv = 'insert'

    // Crear el objeto de datos a enviar al servidor
    const data = {
        nombreActivoJnmv: nombreActivoJnmv,
        usuarioJnmv: loggedInUser,
    };
    // Realizar la solicitud POST al servidor
    fetch('http://localhost:5279/api/v1/Activos', {
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

// Función para insertar un nuevo activo
function validarInsertar() {
    var nombre = document.getElementById("nombre").value;

    // Validar que se ingrese el nombre
    if (nombre) {
        var nuevoActivo = {
            nombre: nombre
        };

        activos.push(nuevoActivo);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert("Por favor, complete el campo de nombre.");
    }
}

// Función para validar y eliminar un activo
function validarEliminar() {
    var index = prompt("Ingrese el índice del activo que desea eliminar:");

    if (index !== null) {
        index = parseInt(index);

        if (!isNaN(index) && index >= 0 && index < activos.length) {
            confirmarEliminar(index);
        } else {
            alert("Índice no válido.");
        }
    }
}

// Función para confirmar la eliminación de un activo
function confirmarEliminar(index) {
    var confirmar = window.confirm("¿Seguro que desea eliminar este activo?");
    if (confirmar) {
        eliminar(index);
    }
}

// Función para eliminar un activo
function eliminar(index) {
    activos.splice(index, 1);
    actualizarTabla();
}

// Función para guardar cambios (puedes implementar lógica de guardado si es necesario)
function guardarCambios() {
    alert("Funcionalidad de guardar no implementada en este ejemplo.");
}

// Función para actualizar la tabla con los datos de activos
function actualizarTabla() {
    var tabla = document.getElementById("table");
    var tbody = tabla.querySelector(".body__table");

    // Limpiar el contenido actual de la tabla
    tbody.innerHTML = "";

    // Agregar los datos actualizados a la tabla
    for (var i = 0; i < activos.length; i++) {
        var fila = tbody.insertRow();
        var celdaCodigo = fila.insertCell(0);
        var celdaNombre = fila.insertCell(1);
        var celdaTipoActivo = fila.insertCell(2);
        var celdaCodigoActivo = fila.insertCell(3);
        var celdaAcciones = fila.insertCell(4);

        celdaCodigo.textContent = i + 1;
        celdaNombre.textContent = activos[i].nombre;
        // Puedes agregar más propiedades según sea necesario

        var botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = (function (index) {
            return function () {
                editar(index);
            };
        })(i);

        celdaAcciones.appendChild(botonEditar);
    }
addTblActivos();
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("nombre").value = "";
    // Limpiar más campos si es necesario
}

// Función para editar un activo
function editar(index) {
    var nuevoNombre = prompt("Ingrese el nuevo nombre:", activos[index].nombre);

    if (nuevoNombre !== null) {
        activos[index].nombre = nuevoNombre;
        // Puedes actualizar más propiedades según sea necesario
        actualizarTabla();
    }
}
