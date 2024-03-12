document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
    
});
document.addEventListener("DOMContentLoaded", function () {
    const table_list = document.querySelector(".body__table");
    const newVoucher = document.getElementById('newVaucher');
    localStorage.setItem('IDVoucher', "");
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5279/api/v1/Voucher/all');
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

    async function fetchDataMovement() {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/Movement/all`);
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
        try {
            const { id, numeration, codeVoucher, descriptionVoucher, createdAt, voucherTypeId } = item;
            console.log(item);
            const newRow = document.createElement('tr');
            newRow.dataset.id = id;
            const DateFormat = createdAt;
            const dateObject  = new Date(DateFormat);
            const DateFormated = dateObject.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const table = document.getElementById('table');
            const tbody = table.querySelector('.body__table');
            let VoucherType = await TypeVoucherList(voucherTypeId);
            const movements = await fetchDataMovement();
            const filteredArr = movements.filter(movement => movement.voucherId === item.id);
            const totalDebit = filteredArr.reduce((acc, movement) => acc + movement.debit, 0);
            const totalCredit = filteredArr.reduce((acc, movement) => acc + movement.credit, 0);
            const result = totalDebit - totalCredit;
            
            newRow.innerHTML = `
                <td>${VoucherType.name}</td>
                <td>${numeration}</td>
                <td>${DateFormated}</td> <!-- Aquí se utiliza la fecha formateada -->
                <td>${descriptionVoucher}</td>
                <td>${result}</td>
                <td>
                <a href="./FormContable.html">
                    <button type="button" class="btn btn-active edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                </a>
                    <!-- delete btn -->
                    <button type="button" class="btn btn-inactive delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
    
            const editBtn = newRow.querySelector('.edit-btn');
            const deleteBtn = newRow.querySelector('.delete-btn');
            
            editBtn.addEventListener("click", async () => {
                fetchDataMovement();
                localStorage.setItem('IDVoucher', id);
            });

            deleteBtn.addEventListener('click', deleteItem);
            /*  deleteBtn.addEventListener('click', async () => {
                deleteItem;
                tbody.removeChild(newRow);
            });*/

            tbody.appendChild(newRow);
        } catch (error) {
            console.error("Error al crear el elemento de la lista:", error);
        }
    }
    
    async function TypeVoucherList(id) {
        const data = await DataVoucher(id);
        return data
    }

    async function DataVoucher(id) {
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
    
    async function deleteItem(e) {
        const element = e.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        const movements = await fetchDataMovement();
        const filteredArr = movements.filter(movement => movement.voucherId == id);

        try {
        for (const movement of filteredArr) {
            if (movement.id) {
                const response = await fetch(`http://localhost:5279/api/v1/Movement/${movement.id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`Error al eliminar el movimiento con ID: ${movement.id}`);
                }
            } else {
                console.error('El movimiento no tiene un ID válido');
            }
        }
        element.remove();
        setTimeout(() => {
            deleteVoucher(id)
        }, 1000);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    async function deleteVoucher(id) {
        try {
            const response = await fetch(`http://localhost:5279/api/v1/Voucher/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el elemento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                    const response = await fetch(`http://localhost:5279/api/v1/Voucher/${id}`, {
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
    
    displayData();
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


