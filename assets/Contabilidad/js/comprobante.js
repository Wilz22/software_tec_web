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

    tbody.addEventListener('input', function(event) {
        const input = event.target;
        if (input.classList.contains('input-debit') || input.classList.contains('input-credit')) {
            const otherInput = input.classList.contains('input-debit') ? input.parentNode.nextElementSibling.querySelector('.input-credit') : input.parentNode.previousElementSibling.querySelector('.input-debit');
            otherInput.disabled = input.value !== '';
        }
        updateTotals();
    });
    

    function updateTotals() {
        const rows = tbody.children;
        let totalDebit = 0;
        let totalCredit = 0;

        for (let i = 0; i < rows.length; i++) {
            const inputDebit = rows[i].querySelector('.input-debit');
            const inputCredit = rows[i].querySelector('.input-credit');
            
            if (!inputDebit.disabled) {
                totalDebit += parseFloat(inputDebit.value) || 0;
            }

            if (!inputCredit.disabled) {
                totalCredit += parseFloat(inputCredit.value) || 0;
            }
        }

        const totalDebitElement = document.querySelector('.total-debit');
        const totalCreditElement = document.querySelector('.total-credit');
        
        totalDebitElement.textContent = `${totalDebit.toFixed(2)}`;
        totalCreditElement.textContent = `${totalCredit.toFixed(2)}`;
        const differenceElement = document.querySelector('.difference');
        const difference = totalDebit - totalCredit;
        console.log(difference)
        if (difference !== 0) {
            differenceElement.textContent = `${difference.toFixed(2)}`;
        }  else {
            differenceElement.textContent = `0.00`;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idFromURL = urlParams.get('id');
    if (idFromURL == ""){
        loadData();
    }else{
        addDefaultRows();
    }
});

function validateTotal() {
    const differenceElement = document.querySelector('.difference');
    const differenceValue = parseFloat(differenceElement.textContent || '0');
    return differenceValue === 0;
}

//Agregar Elementos
function addItem(e) {
    e.preventDefault();
    const id = new Date().getTime().toString();
    const input_date_value = input_date.value;
    const input_number_value = input_number.value;
    const input_type_voucher_value = input_type_voucher.value;
    const input_cod_voucher_value = input_cod_voucher.value;
    const textarea_observations_value = textarea_observations.value;
    if (input_date_value !== "" && input_number_value !== "" && input_type_voucher_value !== "" && input_cod_voucher_value !== ""  && !editFlag) {
        
        if(addMoviments()===false){
            displayAlert("Error en el registro, vuelva a intentarlo y complete los datos de registro", "danger");
        } else if (!validateTotal()){
            displayAlert("Error presenta diferencia en el total del comprobante", "danger");
        }else{
            displayAlert("Registro almacenado", "success");
            addToLocalStorage(id,input_date_value, input_number_value, input_type_voucher_value, input_cod_voucher_value, input_cod_voucher, textarea_observations_value, addMoviments());
            goBackVoucher();   
        }

        
        
        }else {
            displayAlert("Error en el registro, vuelva a intentarlo", "danger");
        } 
}

function goBackVoucher() {
    displayAlert("Registro almacenado", "success");

    setTimeout(function () {
        window.history.back()
    }, 1000);
    

}

function addMoviments() {
    const dataArray = [];
    const table = document.getElementById('table');
    const tbody = table.querySelector('.body__table-voucher');
    const rows = tbody.children;
    
    let hasError = false;

    for (let i = 0; i < rows.length; i++) {
        const id_row = rows[i].getAttribute('data-id');
        const select_bar = rows[i].querySelector('.select-bar');
        const input_contact = rows[i].querySelector('.input-contact');
        const input_description = rows[i].querySelector('.input-description');
        const input_debit = rows[i].querySelector('.input-debit');
        const input_credit = rows[i].querySelector('.input-credit');
        const rowData = {};

        if (select_bar.value == "" || input_contact.value == "" || (input_debit.value == "" && input_credit.value == "")) {
            displayAlert("Error en el registro, complete los campos y vuelva a intentarlo", "danger");
            hasError = true;
        }

        rowData["id"] = id_row;
        rowData["select_bar"] = select_bar.value;
        rowData["input_contact"] = input_contact.value;
        rowData["input_description"] = input_description.value;
        rowData["input_debit"] = input_debit.value;
        rowData["input_credit"] = input_credit.value;
        dataArray.push(rowData);
    }

    if (hasError) {
        return false; 
    } else {
        return dataArray;
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    alert.classList.add(`show`);
    setTimeout(function () {
        alert.textContent = "";
    alert.classList.remove(`show`);
    alert.classList.remove(`alert-${action}`);
    }, 1000);
}

function addDefaultRows() {
    const table = document.getElementById('table');
    const tbody = table.querySelector('.body__table-voucher');
    for (let i = 0; i < 2; i++) {
        const newRow = document.createElement('tr');
        let attr = document.createAttribute("data-id");
        attr.value = new Date().getTime().toString();
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
    }
}

/* Local Storage*/
function addToLocalStorage(id,input_date, input_number, input_type_voucher, input_cod_voucher, input_cod_voucher, textarea_observations, dataArray) {
    const voucher = { id,input_date, input_number, input_type_voucher, input_cod_voucher, input_cod_voucher, textarea_observations, dataArray };
    let items = getLocalStorage();
    items.push(voucher);
    localStorage.setItem("list-voucher", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list-voucher")
    ? JSON.parse(localStorage.getItem("list-voucher"))
    : [];
}

function loadData() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromURL = urlParams.get('id');
    let voucher = getLocalStorage();
    for (let i = 0; i < voucher.length; i++) {
        const item = voucher[i];
        if (idFromURL === item.id) {
            input_date.value = item.input_date;
            input_number.value = item.input_number;
            input_type_voucher.value = item.input_type_voucher;
            input_cod_voucher.value = item.input_cod_voucher;
            textarea_observations.value = item.textarea_observations;
            const tbody = document.querySelector('.body__table-voucher');
            if (item.dataArray) {
                for (let j = 0; j < item.dataArray.length; j++) {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${j + 1}</td>
                        <td class="input-account">
                            <select class="select-bar">
                                <option value="Todos los estados">Todos los estados</option>
                                <option value="Activos">Activos</option>
                                <option value="Inactivos">Inactivos</option>
                            </select>
                        </td>
                        <td><input type="text" class="input-bar input-contact" placeholder="Contacto"></td>
                        <td><input type="text" class="input-bar input-description"></td>
                        <td><input type="text" class="input-bar input-debit" placeholder="0"></td>
                        <td><input type="text" class="input-bar input-credit" placeholder="0"></td>
                        <td><button class="btn btn-inactive btn-delete-row"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                    `;
                    tbody.appendChild(newRow);

                    const selectBar = newRow.querySelector('.select-bar');
                    const inputContact = newRow.querySelector('.input-contact');
                    const inputDescription = newRow.querySelector('.input-description');
                    const inputDebit = newRow.querySelector('.input-debit');
                    const inputCredit = newRow.querySelector('.input-credit');

                    selectBar.value = item.dataArray[j].select_bar;
                    inputContact.value = item.dataArray[j].input_contact;
                    inputDescription.value = item.dataArray[j].input_description;
                    inputDebit.value = item.dataArray[j].input_debit;
                    inputCredit.value = item.dataArray[j].input_credit;
                }
            }
        }
    }
}