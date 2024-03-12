document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
    
});
document.addEventListener("DOMContentLoaded", function () {
    const btnfilter= document.getElementById("filter-button")
    const add_item = document.querySelector('.add-item');
    const modal = document.querySelector('.modal');
    const form = document.querySelector(".modal__form");
    const alert = document.querySelector(".modal__alert");
    const input_cod = document.getElementById("input-cod");
    const input_name = document.getElementById("input-name");
    const input_status = document.getElementById("input-status");
    const input_AccountType = document.getElementById("input-type");
    const input_description = document.getElementById("input-description");
    const input_type = document.getElementById("input-type");
    
    
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
        addItem()
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
    
    
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5279/api/v1/Account/All');
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async function DataAccount(id) {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/AccountType/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async function populateAccountTypeSelect() {
        const accountTypes = await fetchAccountTypes();
        const select = document.getElementById('input-type');
        select.innerHTML = '';
    
        accountTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id; 
            option.textContent = type.name; 
            select.appendChild(option);
        });
    }
    
    async function fetchAccountTypes() {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/AccountType/all`);
            if (!response.ok) throw new Error('Error al obtener los tipos de cuenta');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    function generatePaginationButtons(totalRows) {
        const paginationContainer = document.querySelector('.footer__table-container');
        paginationContainer.innerHTML = '';
    
        if(totalRows>5){

            const prevButton = document.createElement('button');
            prevButton.setAttribute('aria-label', 'Previous');
            prevButton.className = 'btn footer__table-btn-preview';
            const prevIcon = document.createElement('i');
            prevIcon.className = 'fa fa-arrow-left';
            prevIcon.setAttribute('aria-hidden', 'true');
            prevButton.appendChild(prevIcon);
            paginationContainer.appendChild(prevButton);
            
            for (let i = 1; i <= totalRows / 5; i++) {
                const button = document.createElement('button');
                button.className = 'btn';
                button.textContent = i;
                paginationContainer.appendChild(button);
            }
            
            const nextButton = document.createElement('button');
            nextButton.setAttribute('aria-label', 'Next');
            nextButton.className = 'btn footer__table-btn-next';
            const nextIcon = document.createElement('i');
            nextIcon.className = 'fa fa-arrow-right';
            nextIcon.setAttribute('aria-hidden', 'true');
            nextButton.appendChild(nextIcon);
            paginationContainer.appendChild(nextButton);
        }
    }
    async function initializePagination() {
        const data = await fetchData();
        const totalRows = data.length;
        generatePaginationButtons(totalRows);
    }
    
    async function TypeAccountsList(id) {
        const data = await DataAccount(id);
        return data
    }
    

    async function deleteItem(e) {
        const element = e.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        try {
            const response = await fetch(`http://localhost:5279/api/v1/Account/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el elemento');
            }
            table_list.removeChild(element);
            AuditAM("Delete", getUrlParameter())
        } catch (error) {
            console.error('Error:', error);
        }
    }
    function addItem() {
        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.textContent = "Guardar";
        submitBtn.addEventListener("click", async (event) => {
            event.preventDefault(); 
            const value_code = input_cod.value;
            const value_name = input_name.value;
            const value_status = input_status.value;
            const value_description = input_description.value;
            const value_AccountType = input_AccountType.value;
            const data = {
                code: value_code,
                name: value_name,
                status: value_status,
                description: value_description,
                accountTypeId: value_AccountType
            };
            console.log(data);
            try {
                const response = await fetch('http://localhost:5279/api/v1/Account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error('Error al agregar el elemento');
                }
                const responseData = await response.json();
                displayAlert("Elemento agregado correctamente", "success");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                AuditAM("Insert", getUrlParameter())
            } catch (error) {
                console.error('Error:', error);
                displayAlert("Error al agregar el elemento", "danger");
            }
        });
    }
    
    function getUrlParameter(name) {
        var userAM = localStorage.getItem("loggedInUser");
        return userAM
    }

    async function displayData() {
        try {
            const data = await fetchData();
            if (data.length > 0) {
                data.forEach(createListItem);
            }
        } catch (error) {
            console.error('Error al intentar mostrar los datos: ', error);
        }
    }
    
    async function createListItem(item) {
        const { id, code, name, accountTypeId, status, description } = item;
        const element = document.createElement('tr');
        let accountTypeName = await TypeAccountsList(accountTypeId);
        element.dataset.id = id;
        element.dataset.accountType = accountTypeName.name;
        element.classList.add("register-item");
        element.innerHTML = `
            <td>${code}</td>
            <td>${name}</td>
            <td>${accountTypeName.name}</td>
            <td class="element__modifier"><button class="btn btn-${status.toLowerCase()}">${status == "Active" ? "Encendido" : "Apagado"}</button></td>
            <td class="element__modifier"><span>${description}</span></td>
            <td>
                <button type="button" class="btn btn-active edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn btn-inactive delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        table_list.appendChild(element);
    }
    
    
    function editItem(e) {
        e.preventDefault();
        const element = e.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        showModal();
        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.textContent = "Editar";
    
        
        submitBtn.addEventListener("click", () => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
    
                const value_code = input_cod.value;
                const value_name = input_name.value;
                const value_status = input_status.value;
                const value_description = input_description.value;
    
                try {
                    const response = await fetch(`http://localhost:5279/api/v1/Account/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            code: value_code,
                            name: value_name,
                            status: value_status,
                            description: value_description,
                            accountTypeId: 3
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Error al editar el elemento');
                    }
                    const updatedData = await response.json();
                    displayAlert("Elemento editado correctamente", "success");
                    AuditAM("Edit", getUrlParameter())
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Error:', error);
                    displayAlert("Error al editar el elemento", "danger");
                }
            });
    
        });
    }
    
    function AuditAM(NameAM, User ){
        const data = {
            nameAM: NameAM,
            userAM: User
        };
        fetch("http://localhost:5279/audit/v1/Audit", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar registro de usuario');
            }
            return response.json();
        }) 
        .catch(error => {
            console.log("error", error);
        })
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
    
    displayData();
    initializePagination();
    populateAccountTypeSelect();
    });





    
    $(document).ready(function(){
        $("#search").keyup(function(){
            _this = this;
            $.each($("#table tbody tr"), function() {
                if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });
    });
    
    
    $(document).ready(function() {
        $('.btn-apply').click(function() {
            const selectedState = $('.filter-menu select').val();
            $('.register-item').each(function() { 
                const itemState = $(this).data('account-type'); 
                if (selectedState === 'Todos los estados' || itemState === selectedState) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    
        $('.btn-reset').click(function() {
            $('.register-item').show(); 
        });
    });