document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
    
});

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".submit-btn");
    const form = document.querySelector(".save-voucher");
    const addRowLink = document.getElementById('add-row');
    const tbody = document.querySelector('.body__table-voucher');
    const input_date = document.getElementById("input-date");
    const input_number = document.getElementById("input-number");
    const input_type_voucher = document.getElementById("input-type-voucher");
    const input_cod_voucher = document.getElementById("input-cod-voucher");
    const textarea_observations = document.getElementById("textarea-observations");
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5279/api/v1/Movement/all');
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

    async function displayData() {
        let IDVoucher = localStorage.getItem('IDVoucher');
        if(IDVoucher != ""){
            const voucherData = await DataVoucher(IDVoucher);
            const { id, numeration, codeVoucher, descriptionVoucher, voucherTypeId, createdAt} = voucherData;
            const voucherTypeData = await DataTypeVoucher(voucherTypeId);
            const { idType, name, status,} = voucherTypeData;
            const input_date = document.querySelector("#input-date");
            const input_type_voucher = document.querySelector("#input-type-voucher");
            const input_number = document.querySelector("#input-number");
            const input_cod_voucher = document.querySelector("#input-cod-voucher");
            const textarea_voucher = document.querySelector("#textarea-observations");
            const DateFormat = createdAt;
            const dateObject = new Date(DateFormat);
            const DateFormated = dateObject.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const parts = DateFormated.split('/');
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; 
            input_date.value = formattedDate;
            input_type_voucher.value = name;
            input_number.value = numeration;
            input_cod_voucher.value = codeVoucher;
            textarea_voucher.value = descriptionVoucher;

            try {
                const data = await fetchData();
                const filteredData = data.filter(item => item.voucherId == IDVoucher);
                if (filteredData.length > 0) {
                    filteredData.forEach(createListItem);
                }
            } catch (error) {
                console.error('Error al intentar mostrar los datos: ', error);
            }
        }
    }

    async function DataVoucher(id) {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/Voucher/${id}`);
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
    
    async function DataTypeVoucher(id) {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/VoucherType/${id}`);
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

    async function createListItem(item) {
        try {
            const { id, contact, descriptionVoucher, debit, credit, createdAt, voucherId, accountTypeId } = item;
            const newRow = document.createElement('tr');
            const accountName = await AccountTypeId(accountTypeId);
            newRow.dataset.id = id;
            const DateFormat = createdAt;
            const dateObject = new Date(DateFormat);
            const DateFormated = dateObject.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const table = document.getElementById('table');
            
            const accountNameValue = accountName.name;
            newRow.innerHTML = `
                <td>${tbody.children.length + 1}</td>
                <td><input type="text" class="input-bar input-accounName" disabled value="${accountNameValue}"></td>
                <td><input type="text" class="input-bar input-contact" value="${contact}"></td>
                <td><input type="text" class="input-bar input-description" value="${descriptionVoucher}"></td>
                <td><input type="text" class="input-bar input-debit" placeholder="0" value="${debit}"></td>
                <td><input type="text" class="input-bar input-credit" placeholder="0" value="${credit}"></td>
                <td><button class="btn btn-inactive btn-delete-row"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
            `;
    
            tbody.appendChild(newRow);
        } catch (error) {
            console.error("Error al crear el elemento de la lista:", error);
        }
    }

    async function AccountTypeId(id) {
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
    displayData();
    
    
    async function deleteItem(row) {
        const id = row.dataset.id;
        try {
            const response = await fetch(`http://localhost:5279/api/v1/Movement/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el elemento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    tbody.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete-row')) {
            const row = event.target.closest('tr');
            if (row) { 
                tbody.removeChild(row);
                updateRowNumbers();
                deleteItem(row);
            }
        }
    });
    
        if (addRowLink) {
            addRowLink.addEventListener('click', function(event) {
                event.preventDefault();
                const newRow = document.createElement('tr');
                newRow.classList.add("register-item");
                const rows = tbody.children;
                newRow.innerHTML = `
                    <td>${rows.length+1}</td>
                    <td><input type="text" class="input-bar input-accounName" placeholder="Contacto"></td>
                    <td><input type="text" class="input-bar input-contact" placeholder="Contacto"></td>
                    <td><input type="text" class="input-bar input-description"></td>
                    <td><input type="text" class="input-bar input-debit" placeholder="0"></td>
                    <td><input type="text" class="input-bar input-credit" placeholder="0"></td>
                    <td><button class="btn btn-inactive btn-delete-row"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                `;
    
                tbody.appendChild(newRow);
    
                const deleteRowButton = newRow.querySelector('.btn-delete-row');
                deleteRowButton.addEventListener('click', function(e) {
                    updateRowNumbers(e);
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
        function validateTotal() {
            const differenceElement = document.querySelector('.difference');
            const differenceValue = parseFloat(differenceElement.textContent || '0');
            return differenceValue === 0;
        }
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            addMoviments();
        });
        function addMoviments() {
            const dataArray = [];
            const rows = tbody.children;
            console.log(rows)
            let hasError = false;
            let IDVoucher = localStorage.getItem('IDVoucher');
            for (let i = 0; i < rows.length; i++) {
                const id_row = rows[i].getAttribute('data-id');
                const input_contact = rows[i].querySelector('.input-contact');
                const input_description = rows[i].querySelector('.input-description');
                const input_debit = rows[i].querySelector('.input-debit');
                const input_credit = rows[i].querySelector('.input-credit');
                const rowData = {};
                if (!input_contact || !input_description || !input_debit || !input_credit) {
                    console.error('Uno o más elementos no se encontraron');
                    hasError = true;
                    break;
                }
    
                if (input_contact.value == "" || input_description.value == "" || (input_debit.value == "" && input_credit.value == "")) {
                    displayAlert("Error en el registro, complete los campos y vuelva a intentarlo", "danger");
                    hasError = true;
                }
    
                rowData["id"] = id_row;
                rowData["input_contact"] = input_contact.value;
                rowData["input_description"] = input_description.value;
                rowData["input_debit"] = input_debit.value;
                rowData["input_credit"] = input_credit.value;
                rowData["voucherId"] = IDVoucher;
                dataArray.push(rowData);
            }
            
            if (hasError) {
                return false; 
            } else {
                SaveMovements(dataArray)
                return dataArray;
            }
        }
        async function SaveMovements(dataArray) {
            for (const item of dataArray) {
                try {
                    const response = await fetch(`http://localhost:5279/api/v1/Movement/${item.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "id": item.id,
                            "contact": item.input_contact,
                            "descriptionVoucher": item.input_description,
                            "debit": item.input_debit,
                            "credit": item.input_credit,
                            "voucherId": item.voucherId 
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Error al actualizar el movimiento con ID: ${item.id}`);
                    }
                    const data = await response.json();
                    console.log(`Movimiento actualizado con ID: ${item.id}`, data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
});