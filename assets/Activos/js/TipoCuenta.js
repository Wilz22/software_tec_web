// Array para almacenar los datos de activos
var activos = [];

// Función para insertar un nuevo activo
function validarInsertar() {
    var nombre = document.getElementById("Nombre").value;
    var tipoActivo = document.getElementById("TipoActivo").value;
    var codigoActivo = document.getElementById("CodigoActivo").value;

    // Validar que se ingresen todos los datos
    if (nombre && tipoActivo && codigoActivo) {
        var nuevoActivo = {
            nombre: nombre,
            tipoActivo: tipoActivo,
            codigoActivo: codigoActivo
        };

        activos.push(nuevoActivo);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert("Por favor, complete todos los campos.");
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
        celdaTipoActivo.textContent = activos[i].tipoActivo;
        celdaCodigoActivo.textContent = activos[i].codigoActivo;

        var botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = (function (index) {
            return function () {
                editar(index);
            };
        })(i);

        celdaAcciones.appendChild(botonEditar);
    }
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("Nombre").value = "";
    document.getElementById("TipoActivo").value = "";
    document.getElementById("CodigoActivo").value = "";
}

// Función para editar un activo
function editar(index) {
    var nuevoNombre = prompt("Ingrese el nuevo nombre:", activos[index].nombre);
    var nuevoTipoActivo = prompt("Ingrese el nuevo tipo de activo:", activos[index].tipoActivo);
    var nuevoCodigoActivo = prompt("Ingrese el nuevo código de activo:", activos[index].codigoActivo);

    if (nuevoNombre !== null && nuevoTipoActivo !== null && nuevoCodigoActivo !== null) {
        activos[index].nombre = nuevoNombre;
        activos[index].tipoActivo = nuevoTipoActivo;
        activos[index].codigoActivo = nuevoCodigoActivo;
        actualizarTabla();
    }
}


// Array para almacenar los datos de activos
var activos = [];

// Función para insertar un nuevo activo
function validarInsertar() {
    var nombre = document.getElementById("Nombre").value;
    var tipoActivo = document.getElementById("TipoActivo").value;
    var codigoActivo = document.getElementById("CodigoActivo").value;

    // Validar que se ingresen todos los datos
    if (nombre && tipoActivo && codigoActivo) {
        var nuevoActivo = {
            nombre: nombre,
            tipoActivo: tipoActivo,
            codigoActivo: codigoActivo
        };

        activos.push(nuevoActivo);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert("Por favor, complete todos los campos.");
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
        celdaTipoActivo.textContent = activos[i].tipoActivo;
        celdaCodigoActivo.textContent = activos[i].codigoActivo;

        var botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = (function (index) {
            return function () {
                editar(index);
            };
        })(i);

        celdaAcciones.appendChild(botonEditar);
    }
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("Nombre").value = "";
    document.getElementById("TipoActivo").value = "";
    document.getElementById("CodigoActivo").value = "";
}

// Función para editar un activo
function editar(index) {
    var nuevoNombre = prompt("Ingrese el nuevo nombre:", activos[index].nombre);
    var nuevoTipoActivo = prompt("Ingrese el nuevo tipo de activo:", activos[index].tipoActivo);
    var nuevoCodigoActivo = prompt("Ingrese el nuevo código de activo:", activos[index].codigoActivo);

    if (nuevoNombre !== null && nuevoTipoActivo !== null && nuevoCodigoActivo !== null) {
        activos[index].nombre = nuevoNombre;
        activos[index].tipoActivo = nuevoTipoActivo;
        activos[index].codigoActivo = nuevoCodigoActivo;
        actualizarTabla();
    }
}
// FUNCIONES_GENERICAS.js


var indiceActual = 0; // Variable global para el índice

function insertarGenerico(array, idNombre, actualizarTablaFunc) {
    var nombre = document.getElementById(idNombre).value;

    if (!esNombreDuplicado(array, nombre)) {
        var codigo = generarCodigoSecuencial(array);

        array.push({ codigo: codigo, nombre: nombre });

        actualizarTablaFunc(array);
    } else {
        alert("Ya existe un elemento con el mismo nombre. Intente con un nombre diferente.");
    }
}

function insertarGenerico1(array, idNombre, idApellido, actualizarTablaFunc) {
    var nombre = document.getElementById(idNombre).value;
    var apellido = document.getElementById(idApellido).value;

    if (!esNombreDuplicado(array, nombre) && !esApellidoDuplicado(array, apellido)) {
        var codigo = generarCodigoSecuencial(array);

        array.push({ codigo: codigo, nombre: nombre, apellido: apellido });

        actualizarTablaFunc(array);
    } else {
        alert("Ya existe un elemento con el mismo nombre o apellido. Intente con valores diferentes.");
    }
}

function esApellidoDuplicado(array, apellido) {
    return array.some(function (element) {
        return element.apellido.toLowerCase() === apellido.toLowerCase();
    });
}


function esNombreDuplicado(array, nombre) {
    return array.some(function (element) {
        return element.nombre.toLowerCase() === nombre.toLowerCase();
    });
}

function generarCodigoSecuencial(array) {
    var numeroElementos = array.length + 1 + indiceActual;
    return codigoInicial + "_" + pad(numeroElementos, 3);
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function prepararGuardarGenerico(array, actualizarTablaFunc) {
    var codigoAGenerar = generarCodigoSecuencial(array);

    document.getElementById("codigo").value = codigoAGenerar;

    var confirmacion = confirm("¿Estás seguro de querer guardar y reiniciar la tabla?");
    if (confirmacion) {
        array = [];
        actualizarTablaFunc(array);
        indiceActual = 0; // Reiniciar el índice
    } else {
        document.getElementById("codigo").value = "";
    }
}

function buscarGenerico(array, idBusqueda, idOpcionBusqueda, actualizarTablaFunc) {
    var filtro = document.getElementById(idBusqueda).value;
    var opcion = document.getElementById(idOpcionBusqueda).value;

    var resultados = array.filter(function (element) {
        return element[opcion].toLowerCase().includes(filtro.toLowerCase());
    });


    actualizarTablaFunc(resultados);
}

function confirmarEliminarGenerico(array, index, actualizarTablaFunc) {
    var confirmacion = confirm("¿Estás seguro de querer eliminar este elemento?");
    if (confirmacion) {
        eliminarGenerico(array, index, actualizarTablaFunc);
    }
}

function eliminarGenerico(array, index, actualizarTablaFunc) {
    array.splice(index, 1);
    actualizarTablaFunc(array);
}

function modificarGenerico(array, index, actualizarTablaFunc) {
    var nuevoCodigo = prompt("Nuevo código:", array[index].codigo);
    var nuevoNombre = prompt("Nuevo nombre:", array[index].nombre);

    if (nuevoCodigo !== null && nuevoNombre !== null) {
        if (!esDuplicado(array, nuevoCodigo, nuevoNombre)) {
            array[index].codigo = nuevoCodigo;
            array[index].nombre = nuevoNombre;
            actualizarTablaFunc(array);
        } else {
            alert("Ya existe un elemento con el mismo código o nombre. Intente con valores diferentes.");
        }
    }
}

function esDuplicado(array, codigo, nombre) {
    return array.some(function (element) {
        return element.codigo.toLowerCase() === codigo.toLowerCase() || element.nombre.toLowerCase() === nombre.toLowerCase();
    });
}

function formatDate(date) {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}

function insertarGenericoFecha(array, idNombre, idFecha, actualizarTablaFunc) {
    var nombre = document.getElementById(idNombre).value;
    var fechaString = document.getElementById(idFecha).value;

    // Convertir la cadena de fecha a un objeto de fecha
    var fecha = new Date(fechaString);

    if (!isNaN(fecha.getTime()) && !esNombreDuplicado(array, nombre)) {
        var codigo = generarCodigoSecuencial(array);

        array.push({ codigo: codigo, nombre: nombre, fechaCompra: fecha });

        actualizarTablaFunc(array);
    } else {
        alert("Ingrese una fecha válida y asegúrese de que el nombre no esté duplicado.");
    }
}


function insertarGenerico2(array, idNombre, idID, idPeriodos, idValorCompra, idTipoActivo, actualizarTablaFunc) {
    var nombre = document.getElementById(idNombre).value;
    var id = document.getElementById(idID).value;
    var periodos = document.getElementById(idPeriodos).value;
    var valorCompra = document.getElementById(idValorCompra).value;
    var tipoActivo = document.getElementById(idTipoActivo).value;

    if (!esNombreDuplicado(array, nombre) && !esIDDuplicado(array, id)) {
        var codigo = generarCodigoSecuencial(array);

        array.push({
            codigo: codigo,
            nombre: nombre,
            id: id,
            periodos: periodos,
            valorCompra: valorCompra,
            tipoActivo: tipoActivo
        });

        actualizarTablaFunc(array);
    } else {
        alert("Ya existe un elemento con el mismo nombre o ID. Intente con valores diferentes.");
    }
}

function esIDDuplicado(array, id) {
    return array.some(function (element) {
        return element.id.toLowerCase() === id.toLowerCase();
    });
}

