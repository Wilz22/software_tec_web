

// Función para depreciar activos seleccionados
function depreciarSeleccionados() {
    var mesActual = document.getElementById("mesConsulta").value;

    for (var i = 0; i < activosDetalle.length; i++) {
        if (activosDetalle[i].seleccionado && activosDetalle[i].numDepreciaciones > 0 && activosDetalle[i].estado !== 'Depreciado') {
            if (activosDetalle[i].mesDepreciacion && activosDetalle[i].mesDepreciacion === mesActual) {
                alert("El activo " + activosDetalle[i].codigo + " ya ha sido depreciado este mes.");
                continue;
            }

            activosDetalle[i].numDepreciaciones -= 1;
            activosDetalle[i].mesDepreciacion = mesActual;

            if (activosDetalle[i].numDepreciaciones === 0) {
                activosDetalle[i].estado = 'Depreciado';
            }

            activosDetalle[i].valorActual -= activosDetalle[i].valorDepreciacion;
        }
    }

    // Actualiza la tabla después de la depreciación
    actualizarTabla(activosDetalle);
}

// Función para depreciar automáticamente
function depreciarAutomatico() {
    var mesActual = document.getElementById("mesConsulta").value;

    for (var i = 0; i < activosDetalle.length; i++) {
        if (!activosDetalle[i].seleccionado && activosDetalle[i].numDepreciaciones > 0 && activosDetalle[i].estado === 'No Depreciado') {
            if (activosDetalle[i].mesDepreciacion && activosDetalle[i].mesDepreciacion === mesActual) {
                continue;
            }

            activosDetalle[i].numDepreciaciones -= 1;
            activosDetalle[i].mesDepreciacion = mesActual;

            if (activosDetalle[i].numDepreciaciones === 0) {
                activosDetalle[i].estado = 'Depreciado';
            }

            activosDetalle[i].valorActual -= activosDetalle[i].valorDepreciacion;
        }
    }

    // Actualiza la tabla después de la depreciación automática
    actualizarTabla(activosDetalle);
}

// Función para actualizar la tabla con los datos proporcionados
function actualizarTabla(data) {
    var tabla = document.getElementById("detalleActivos");
    tabla.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var fila = tabla.insertRow();
        fila.id = "fila" + i; // Asignar un ID único a la fila

        var celdaCodigo = fila.insertCell(0);
        var celdaActivo = fila.insertCell(1);
        var celdaNumDepreciaciones = fila.insertCell(2);
        var celdaValorDepreciacion = fila.insertCell(3);
        var celdaValorActual = fila.insertCell(4);
        var celdaEstado = fila.insertCell(5);
        var celdaSeleccionar = fila.insertCell(6);

        celdaCodigo.innerHTML = data[i].codigo;
        celdaActivo.innerHTML = data[i].activo;
        celdaNumDepreciaciones.innerHTML = data[i].numDepreciaciones;
        celdaValorDepreciacion.innerHTML = data[i].valorDepreciacion;
        celdaValorActual.innerHTML = data[i].valorActual;
        celdaEstado.innerHTML = data[i].estado;

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data[i].seleccionado;
        checkbox.addEventListener("change", crearEventoSeleccion(i));

        celdaSeleccionar.appendChild(checkbox);
    }
}

// Función para crear un evento de selección para un índice dado
function crearEventoSeleccion(index) {
    return function () {
        activosDetalle[index].seleccionado = !activosDetalle[index].seleccionado;
    };
}

// Función para actualizar el mes de consulta
function actualizarMesConsulta() {
    var mesConsulta = document.getElementById("mesConsulta").value;

    for (var i = 0; i < activosDetalle.length; i++) {
        activosDetalle[i].mesConsulta = mesConsulta;
    }
}

// Función para generar un informe de depreciación
function generarInformeDepreciacion() {
    var numero = document.getElementById('numero').value;
    var fecha = document.getElementById('fecha').value;
    var observacion = document.getElementById('observacion').value;
    var responsable = document.getElementById('responsable').value;

    var informeDepreciacion = [
        { codigo: 'ACT_001', activo: 'Computadora', valorInicial: 1000, valorDepreciado: 100, valorActual: 900 },
        { codigo: 'ACT_002', activo: 'Impresora', valorInicial: 500, valorDepreciado: 50, valorActual: 450 },
        { codigo: 'ACT_003', activo: 'Escritorio', valorInicial: 800, valorDepreciado: 80, valorActual: 720 }
    ];

    var informeHTML = construirInformeHTML(numero, fecha, observacion, responsable, informeDepreciacion);
    abrirModal(informeHTML);
}

// Función para generar un informe por mes
function generarInformePorMes() {
    var numero = document.getElementById('numero').value;
    var fecha = document.getElementById('fecha').value;
    var observacion = document.getElementById('observacion').value;
    var responsable = document.getElementById('responsable').value;

    var mesSeleccionado = document.getElementById("mes").value;
    var informePorMes = [
        { codigo: 'ACT_001', activo: 'Computadora', valorDepreciado: 10 },
        { codigo: 'ACT_002', activo: 'Impresora', valorDepreciado: 5 },
        { codigo: 'ACT_003', activo: 'Escritorio', valorDepreciado: 8 }
    ];

    var informeHTML = construirInformeHTML(numero, fecha, observacion, responsable, informePorMes);
    abrirModal(informeHTML);
}

// Función para construir un informe HTML
function construirInformeHTML(numero, fecha, observacion, responsable, datos) {
    var informeHTML = "<h2>Informe</h2>";
    informeHTML += "<h3>Número: " + numero + "</h3>";
    informeHTML += "<h3>Fecha: " + fecha + "</h3>";
    informeHTML += "<h3>Observación: " + observacion + "</h3>";
    informeHTML += "<h3>Responsable: " + responsable + "</h3>";
    informeHTML += "<table border='1'><thead><tr><th>Código Activo</th><th>Activo</th><th>Valor Depreciado</th></tr></thead><tbody>";

    for (var i = 0; i < datos.length; i++) {
        informeHTML += "<tr><td>" + datos[i].codigo + "</td><td>" + datos[i].activo + "</td><td>" + datos[i].valorDepreciado + "</td></tr>";
    }

    informeHTML += "</tbody></table>";

    return informeHTML;
}

// Función para abrir el modal con el contenido dado
function abrirModal(contenido) {
    var modal = document.getElementById('miModal');
    var informeContainer = document.getElementById('informeContainer');

    informeContainer.innerHTML = contenido;
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
}

    // Función para imprimir el informe
    function imprimirInforme() {
        var contenidoInforme = document.getElementById('informeContainer').innerHTML;

        var ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write('<html><head><title>Informe de Depreciación</title>');
        ventanaImpresion.document.write('</head><body>');
        ventanaImpresion.document.write(contenidoInforme);
        ventanaImpresion.document.write('</body></html>');

        ventanaImpresion.document.close(); // Cerrar el documento para finalizar la carga
        ventanaImpresion.print();
    }
