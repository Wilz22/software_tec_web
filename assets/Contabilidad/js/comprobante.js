/*Logica*/
const form = document.querySelector(".save-voucher");
const alert = document.querySelector(".modal__alert");
//Inputs
const input_date = document.getElementById("input-date");
const input_number = document.getElementById("input-number");
const input_type_voucher = document.getElementById("input-type-voucher");
const input_cod_voucher = document.getElementById("input-cod-voucher");
const textarea_observations = document.getElementById("textarea-observations");
const submitBtn = document.querySelector(".submit-btn");

const table_list = document.querySelector(".body__table-voucher");

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit", addItem);/* 
window.addEventListener("DOMContentLoaded", setupItems); */

document.addEventListener('DOMContentLoaded', function() {
    const addRowLink = document.getElementById('add-row');
    const table = document.getElementById('table');
    const tbody = table.querySelector('.body__table-voucher');
    const id = new Date().getTime().toString();

    if (addRowLink) {
        addRowLink.addEventListener('click', function(event) {
            event.preventDefault();
            const newRow = document.createElement('tr');
            let attr = document.createAttribute("data-id"); 
            attr.value=id;
            newRow.setAttributeNode(attr);
            newRow.classList.add("register-item");
            newRow.innerHTML = `
                <td >${tbody.children.length + 1}</td>
                <td class="input-account">
                    <select class="select-bar">
                        <option>Todos los estados</option>
                        <option>Activos</option>
                        <option>Inactivos</option>
                    </select>
                </td>
                <td><input type="text" class="input-bar input-contact" placeholder="Contacto"></td>
                <td><input type="text" class="input-bar input-description"></td>
                <td><input type="text" class="input-bar input-debit" placeholder="0"></td>
                <td><input type="text" class="input-bar input-credit" placeholder="0"></td>
                <td><button class="btn btn-inactive btn-delete-row"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
            `;

            tbody.appendChild(newRow);
            const deleteRowButton = newRow.querySelector('.btn-delete-row');
            deleteRowButton.addEventListener('click', function() {
                tbody.removeChild(newRow);
                updateRowNumbers();
            });
        });
    }

    function updateRowNumbers() {
        const rows = tbody.children;
        for (let i = 0; i < rows.length; i++) {
            rows[i].children[0].textContent = i + 1;
        }
    }
});


//Agregar Elementos
function addItem(e) {
    e.preventDefault();
    const table = document.getElementById('table');
    const tbody = table.querySelector('.body__table-voucher');
    const rows = tbody.children;
    const dataArray = [];
    
    for (let i = 0; i < rows.length; i++) {
        const id_row = rows[i].getAttribute('data-id')
        const select_bar = rows[i].querySelector('.select-bar');
        const input_contact = rows[i].querySelector('.input-contact');
        const input_description = rows[i].querySelector('.input-description');
        const input_debit = rows[i].querySelector('.input-debit');
        const input_credit = rows[i].querySelector('.input-credit');
        const rowData = {};
        console.log(input_contact.value)

        if (select_bar.value == "" || input_contact.value == "" || (input_debit.value == "" && input_credit.value == "" )) {
            displayAlert("Error en el registro, complete los campos y vuelva a intentarlo", "danger");
            console.log("hola")
            break;
        }

        rowData["id"] = id_row;
        rowData["select_bar"] =  select_bar.value;
        rowData["input_contact"] =  input_contact.value;
        rowData["input_description"] =  input_description.value;
        rowData["input_debit"] =  input_debit.value;
        rowData["input_credit"] =  input_credit.value;
        dataArray.push(rowData);
        console.log(dataArray)
    }


/* 
    if (value_date !== "" && value_number !== "" && value_type_voucher !== "" && value_cod_voucher !== ""  && !editFlag) {
        
        const element = document.createElement("tr");
        let attr = document.createAttribute("data-id");
        //Codigo
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("register-item");
        element.innerHTML = `
            <td> ${id} </td>
            <td>${value_type}</td>
            <td> ${value_name}</td>
            <td class="element__modifier"><button class="btn btn-inactive"> ${value_status}</button></td>
            <td class="element__modifier"><span> ${value_description}</span></td>
            <td><button type="button" class="btn btn-active edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="btn btn-inactive delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem)    
        
        table_list.appendChild(element);
        displayAlert("Registro almacenado", "success");
        addToLocalStorage(id, value_name, value_type,value_status,value_description);
        setBackToDefault();     
        } else if (value_date !== "" && value_number !== "" && value_type_voucher !== "" && value_cod_voucher !== "" && editFlag){
        editElement.innerHTML = id;
            displayAlert("Cambios realizados con exito", "success");
            editLocalStorage(editID, value_type, value_name,value_status,value_description);
            setBackToDefault();
        } else {
            displayAlert("Error en el registro, vuelva a intentarlo", "danger");
    } */
}


function displayAlert(text, action) {
    console.log("hola")
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    alert.classList.add(`show`);
    setTimeout(function () {
        alert.textContent = "";
    alert.classList.remove(`show`);
    alert.classList.remove(`alert-${action}`);
    }, 1000);
}
