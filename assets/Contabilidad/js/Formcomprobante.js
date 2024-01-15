let editElement;
let editFlag = false;
let editID = "";

document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('.body__table');
    const items = getLocalStorage();
    items.forEach(function (item) {
        const table = document.getElementById('table');
        const tbody = table.querySelector('.body__table');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.input_type_voucher}</td>
            <td>${generateNumeration(item.input_type_voucher)}</td>
            <td>${formatDate(item.input_date)}</td>
            <td class="body__table-text"><span>${item.textarea_observations}</span></td>
            <td class="body__table-text"><i class="fa fa-usd" aria-hidden="true"></i><span>${calculateTotal(item.dataArray)}</span></td>
            <td><button type="button" class="btn btn-active edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="btn btn-inactive delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        const editBtn = newRow.querySelector('.edit-btn');
        const deleteBtn = newRow.querySelector('.delete-btn');

        editBtn.addEventListener("click", goBackVoucher)    

        deleteBtn.addEventListener('click', function () {
            tbody.removeChild(newRow);
            updateRowNumbers
        });
        tableBody.appendChild(newRow);
    });
});


function generateNumeration(type) {
    let counter = 1;
    return `${type}-${counter}`;
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


function calculateTotal(dataArray) {
    let total = 0;
    dataArray.forEach(function (item) {
        total += parseFloat(item.input_debit) || 0;
        total -= parseFloat(item.input_credit) || 0;
    });
    return total.toFixed(2);
}


function getLocalStorage() {
    return localStorage.getItem("list-voucher") ?
        JSON.parse(localStorage.getItem("list-voucher")) :
        [];
}

function goBackVoucher() {
    const items = getLocalStorage();
    const lastItemId = items.length > 0 ? items[items.length - 1].id : null;
    if (lastItemId) {
        window.location.href = `./FormContable.html?id=${lastItemId}`;
    } else {
        console.error("No se pudo obtener el ID para la redirección.");
    }
}
