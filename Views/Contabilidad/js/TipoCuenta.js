document.getElementById('save-item').addEventListener('click', function() {
    let codigo = document.getElementById('accounts-cod').value;
    let nombre = document.getElementById('accounts-name').value;
    let tipoCuenta = document.getElementById('accounts-type').value;
    let estado = document.getElementById('accounts-status').value;
    let descripcion = document.getElementById('accounts-description').value;
    let examenPractico= document.getElementById('examen_type-number').value;

    agregarRegistro(codigo, nombre, tipoCuenta, estado, descripcion, examenPractico);
});

class Registro {
    constructor(codigo, nombre, tipoCuenta, estado, descripcion, examenPractico) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipoCuenta = tipoCuenta;
        this.estado = estado;
        this.descripcion = descripcion;
        this.examenPractico=examenPractico;
    }
}
let registros = [];

/*Examen practico*/
function agregarRegistro(codigo, nombre, tipoCuenta, estado, descripcion, examenPractico) {
    let nuevoRegistro = new Registro(codigo, nombre, tipoCuenta, estado, descripcion, examenPractico);
    registros.push(nuevoRegistro);
    validarCantidad(examenPractico);
}

function validarCantidad(examenPractico){
    if (examenPractico<0 || examenPractico > 10 ){
        alert("El Valor ingresado, para la cantidad se encuentra fuera del rango, por lo que no es valido")
        
    }else{
        mostrarRegistros();
        return
    }
}
/*--------------------------- */


function editarRegistro(codigo, nuevoNombre, nuevoTipoCuenta, nuevoEstado, nuevaDescripcion) {
    for (let i = 0; i < registros.length; i++) {
        if (registros[i].codigo === codigo) {
            registros[i].nombre = nuevoNombre;
            registros[i].tipoCuenta = nuevoTipoCuenta;
            registros[i].estado = nuevoEstado;
            registros[i].descripcion = nuevaDescripcion;
            break;
        }
    }
}

function eliminarRegistro(codigo) {
    for (let i = 0; i < registros.length; i++) {
        if (registros[i].codigo === codigo) {
            registros.splice(i, 1);
            break;
        }
    }
}


function mostrarRegistros() {
    let table = document.getElementById("table__accounts");
    for (let registro of registros) {
        table.innerHTML = `
        <tr>
            <td> ${registro.codigo} </td>
            <td>${registro.nombre}</td>
            <td>${registro.tipoCuenta}</td>
            <td class="element__modifier"><button class="btn btn-active">${registro.estado}</button></td>
            <td class="element__modifier"><span>${registro.descripcion}</span></td>
            <td>${registro.examenPractico}</td>
        </tr>`;
    }
}



/* editarRegistro('001', 'NuevoNombre1', 'NuevoTipo1', 'NuevoEstado1', 'NuevaDescripción1');

eliminarRegistro('002');

mostrarRegistros(); */
