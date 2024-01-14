document.addEventListener('DOMContentLoaded', function () {
    const agregarClienteBtn = document.getElementById('agregarCliente');
    const rucInput = document.querySelector('.campo:nth-child(1) input');
    const nombresInput = document.querySelector('.campo:nth-child(2) input');
    const direccionInput = document.querySelector('.campo:nth-child(3) input');
    const tableBody = document.querySelector('.body__table');
    const clientesData = [];
    const btnfilter= document.getElementById("filter-button")


    // btnfilter.addEventListener("click", () => {
    //     document.querySelector(".filter-menu").classList.toggle("active")
    // }); 
   
    agregarClienteBtn.addEventListener('click', function () {
        const ruc = rucInput.value;
        const nombres = nombresInput.value;
        const direccion = direccionInput.value;
        // const valor= valorInput.value;
        var valorInput = document.getElementById('valornumber').value;
        var valorNum=parseFloat(valorInput);
        //console.log(valorNum);
        // Validaciones
        if (ruc.length !== 13) {
            alert('El RUC debe tener 13 dígitos.');
            return;
        }

        if (nombres.length > 20) {
            alert('El nombre no puede exceder los 20 caracteres.');
            return;
        }
        if (valorNum<1000 || valorNum>=1500){
            showMessage('El campo valor digitado en el campo Valor, no se encuentra dentro del rango comprendido entre 1000 a 1500', 'red');
            //alert('El campo valor digitado en el campo Valor, no se encuentra dentro del rango comprendido entre 1000 a 1500')
            return;
        }

        if (ruc && nombres && direccion && valorNum) {
            // Crear un objeto con los datos del cliente
            const cliente = {
                codigo: clientesData.length + 1,
                ruc: ruc,
                nombres: nombres,
                direccion: direccion,
                valor:valorNum,
                // estado: 'Activo',
            };
            
            // Agregar el cliente al array
            clientesData.push(cliente);

            // Actualizar la tabla
            updateTable();

            showMessage('Se ha insertado correctamente el Cliente', 'green');
            rucInput.value = '';
            nombresInput.value = '';
            direccionInput.value = '';
            document.getElementById('valornumber').value = 0; 
        } else {
            alert('Completa todos los campos antes de agregar un cliente.');
        }
    });

    function updateTable() {
        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';

        clientesData.forEach(function (cliente) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.codigo}</td>
                <td>${cliente.ruc}</td>
                <td>${cliente.nombres}</td>
                <td>${cliente.direccion}</td>
                <td>${cliente.valor}</td>
                <td>
                    <button aria-label="Eliminar" class="btn" onclick="showOptions(${cliente.codigo})">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
                <td>
                    <button aria-label="Editar" class="btn" onclick="showEdit(${cliente.codigo})">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    window.showOptions = function (codigo) {
        const result = confirm("¿Desea eliminar este cliente?");
        if (result) {

            const index = clientesData.findIndex(cliente => cliente.codigo === codigo);

            clientesData.splice(index, 1);

            // Actualizar la tabla
            updateTable();
            showMessage('Se ha eliminado el cliente', 'red');
        }
        
    };

    window.showEdit = function (codigo) {
        const cliente = clientesData.find(cliente => cliente.codigo === codigo);
        //console.log(cliente);
        // Llenar el formulario con los datos del cliente
        document.querySelector('.campo:nth-child(1) input').value = cliente.ruc;
        document.querySelector('.campo:nth-child(2) input').value = cliente.nombres;
        document.querySelector('.campo:nth-child(3) input').value = cliente.direccion;
        document.getElementById('valornumber').value = cliente.valor;

        // Actualizar el formulario para reflejar el modo de edición
        document.getElementById('agregarCliente').style.display = 'none'; // Ocultar botón de agregar
        // Puedes mostrar u ocultar otros elementos según tus necesidades

        // Obtener el botón existente o crear uno nuevo si no existe
        let guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
        if (!guardarCambiosBtn) {
            guardarCambiosBtn = document.createElement('button');
            guardarCambiosBtn.id = 'guardarCambiosBtn';
            // guardarCambiosBtn.textContent = 'Guardar Cambios';
            guardarCambiosBtn.classList.add('action-button');
            guardarCambiosBtn.innerHTML += 'Guardar Cambios';
            const iconoPencil = document.createElement('i');
            iconoPencil.classList.add('fa', 'fa-pencil-alt');
            guardarCambiosBtn.appendChild(iconoPencil);

            document.querySelector('.dashboard__main-actions-buttons').appendChild(guardarCambiosBtn);
        }

        guardarCambiosBtn.onclick = function () {
        document.getElementById('guardarCambiosBtn').style.display = 'block';
        // Actualizar los datos del cliente en el array
        cliente.ruc = document.querySelector('.campo:nth-child(1) input').value;
        cliente.nombres = document.querySelector('.campo:nth-child(2) input').value;
        cliente.direccion = document.querySelector('.campo:nth-child(3) input').value;
        cliente.valor = parseFloat(document.getElementById('valornumber').value);

        // Puedes agregar más lógica de validación según tus necesidades

        // Después de la actualización, volver a mostrar el botón de agregar y limpiar el formulario
        document.getElementById('agregarCliente').style.display = 'block';
        document.querySelector('.campo:nth-child(1) input').value = '';
        document.querySelector('.campo:nth-child(2) input').value = '';
        document.querySelector('.campo:nth-child(3) input').value = '';
        document.getElementById('valornumber').value = 0;

        document.getElementById('guardarCambiosBtn').style.display = 'none';

        // Actualizar la tabla
        updateTable();
        showMessage('Cambios Guardados','violet')
        };
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
 

});

function llenarCiudadesList(ciudades) {
    const ciudadesList = document.getElementById('ciudadesList');

    // Limpiar opciones existentes
    ciudadesList.innerHTML = '';

    // Agregar nuevas opciones
    ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadesList.appendChild(option);
    });
}

function llenarCiudadesList(ciudades) {
    const ciudadesList = document.getElementById('ciudadesList');

    // Limpiar opciones existentes
    ciudadesList.innerHTML = '';

    // Agregar nuevas opciones
    ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadesList.appendChild(option);
    });
}

function updateCodigo() {
    const ciudadesEjemplo = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'];

    const ciudadesList = document.getElementById('ciudadesList');
    const codigoInput = document.getElementById('codigoInput');

    // Obtén el valor seleccionado del elemento select (nombre de la ciudad)
    const ciudadNombre = ciudadesList.value;

    // Encuentra el índice de la ciudad en el array ciudadesEjemplo
    const ciudadIndex = ciudadesEjemplo.indexOf(ciudadNombre);

    // Actualiza el valor del campo de código con el ID de la ciudad
    if (ciudadIndex !== -1) {
        codigoInput.value = ciudadIndex + 1; 
    }
}

// Llenar la lista de ciudades al cargar la página
llenarCiudadesList(['Quito', 'Guayaquil', 'Cuenca', 'Ambato']);