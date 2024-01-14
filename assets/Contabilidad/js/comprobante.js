/*Funcionalidad */
const btnfilter= document.getElementById("filter-button")
const add_item = document.querySelector('.add-item');
const modal = document.querySelector('.modal');
/*Logica*/
const form = document.querySelector(".modal__form");
const alert = document.querySelector(".modal__alert");
const input_cod = document.getElementById("input-cod");
const input_name = document.getElementById("input-name");
const input_status = document.getElementById("input-status");
const input_description = document.getElementById("input-description");
const submitBtn = document.querySelector(".submit-btn");

const table_list = document.querySelector(".body__table");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";



btnfilter.addEventListener("click", () => {
    document.querySelector(".filter-menu").classList.toggle("active")
}); 


add_item.addEventListener('pointerdown', () => {
    showModal()
});

modal.querySelector('.close').addEventListener('pointerdown', () => {
    hideModal();
});



document.addEventListener('pointerdown', (e) => {
    if (!e.composedPath().includes(modal)) {
        hideModal();  
    }
});

modal.addEventListener('transitionend', function(e) {
    if (!this.classList.contains('show')) {
        if (e.propertyName == 'transform') {
        this.style.display = '';
        }
    }
});

function hideModal() {
    modal.classList.remove('show')
}

function showModal() {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 0)
}

/*Logica*/

form.addEventListener("submit", addItem);
/* clearBtn.addEventListener("click", clearItems);*/
window.addEventListener("DOMContentLoaded", setupItems);

//Agregar Elementos
function addItem(e) {
    e.preventDefault();
    const value_name = input_name.value;
    const value_status = input_status.value;
    const value_description = input_description.value;
    const id = new Date().getTime().toString();
    if (value_name !== "" && value_status !== "" && value_description !== "" && !editFlag) {
        const element = document.createElement("tr");
        let attr = document.createAttribute("data-id");
        //Codigo
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("register-item");
        element.innerHTML = `
            <td> ${id} </td>
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
        addToLocalStorage(id, value_name,value_status,value_description);
        setBackToDefault();     
        } else if (value_name !== "" && value_status !== "" && value_description !== "" && editFlag){
        editElement.innerHTML = id;
            displayAlert("Cambios realizados con exito", "success");
            editLocalStorage(editID, value_name,value_status,value_description);
            setBackToDefault();
        } else {
            displayAlert("Error en el registro, vuelva a intentarlo", "danger");
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    alert.classList.add(`show`);
    if(action==="success"){
        hideModal();  
    }
    setTimeout(function () {
        alert.textContent = "";
    alert.classList.remove(`show`);
    alert.classList.remove(`alert-${action}`);
    }, 1000);
}


function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    table_list.removeChild(element);
    displayAlert("Registro Eliminado", "danger");
    setBackToDefault();
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    showModal();
    /* grocery.value = editElement.innerHTML; */
    input_cod.value=e.currentTarget.parentElement.parentNode.querySelector(":nth-child(1)").innerHTML;
    input_name.value=e.currentTarget.parentElement.parentNode.querySelector(":nth-child(2)").innerHTML;
    input_status.value=e.currentTarget.parentElement.parentNode.querySelector(":nth-child(3) button").innerHTML;
    input_description.value=e.currentTarget.parentElement.parentNode.querySelector(":nth-child(4) span").innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Editar";
}

function setBackToDefault() {
    input_name.value = ""
    input_status.value = ""
    input_description.value = ""
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Guardar";
}

/* Local Storage*/
function addToLocalStorage(id, value_name,value_status,value_description) {
    const accounts = { id, value_name,value_status,value_description };
    let items = getLocalStorage();
    items.push(accounts);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
    if (item.id !== id) {
        return item;
    }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value_name,value_status,value_description) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        console.log(item)
    if (item.id === id) {
        item.value_name= value_name;
        item.value_status= value_status;
        item.value_description= value_description;
    }
    return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}



/*aasd
*/


function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
    items.forEach(function (item) {
        createListItem(item.id, item.value_description,item.value_name,item.value_status);
    });
    }
}

function createListItem(id, value_description,value_name,value_status   ) {
    const element = document.createElement("tr");
        let attr = document.createAttribute("data-id");
        //Codigo
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("register-item");
        element.innerHTML = `
            <td> ${id} </td>
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
}
