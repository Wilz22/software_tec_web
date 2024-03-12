document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
    
});

function fillTable() {
    const tableBody = document.querySelector('.body__table');
    const totalDebitElement = document.querySelector('.total-debit');
    const totalCreditElement = document.querySelector('.total-credit');
    const differenceElement = document.querySelector('.difference');

    let voucher = getLocalStorage();
    let totalDebit = 0;
    let totalCredit = 0;

    const jsonArray = [
        {
            "contact": "Agustin",
            "descriptionVoucher": "Ingreso por venta",
            "debit": 100,
            "credit": 0,
            "Count": "Pagos",
            "accountTypeId": 3,
            "voucherId": 11
        },
        {
            "contact": "Milena",
            "descriptionVoucher": "Mantenimiento",
            "debit": 0,
            "credit": 20,
            "Count": "Pagos",
            "accountTypeId": 5,
            "voucherId": 11
        },
        {
            "contact": "Santi",
            "descriptionVoucher": "Hojas ",
            "debit": 0,
            "credit": 20,
            "Count": "Ingresos",
            "accountTypeId": 5,
            "voucherId": 11
        },
        {
            "contact": "Nati",
            "descriptionVoucher": "Maquinaria",
            "debit": 0,
            "credit": 30,
            "Count": "Patrimonio",
            "accountTypeId": 3,
            "voucherId": 22
        },
        {
            "contact": "Andy",
            "descriptionVoucher": "Compra de aparatos",
            "debit": 0,
            "credit": 30,
            "Count": "Pasivos",
            "accountTypeId": 3,
            "voucherId": 23
        },
        {
            "contact": "Fernanda",
            "descriptionVoucher": "Nomina",
            "debit": 0,
            "credit": 10,
            "Count": "Pagos",
            "accountTypeId": 5,
            "voucherId": 24
        },
        {
            "contact": "Gabriel",
            "descriptionVoucher": "Pagos a proveedores",
            "debit": 0,
            "credit": 5,
            "Count": "Pagos",
            "accountTypeId": 5,
            "voucherId": 25
        },
        {
            "contact": "Hugo",
            "descriptionVoucher": "Notas de venta",
            "debit": 35,
            "credit": 0,
            "Count": "Pagos",
            "accountTypeId": 3,
            "voucherId": 26
        },
        {
            "contact": "Isabela",
            "descriptionVoucher": "Venta de equipos",
            "debit": 0,
            "credit": 10,
            "Count": "Pagos",
            "accountTypeId": 3,
            "voucherId": 27
        },
        {
            "contact": "Julia",
            "descriptionVoucher": "Pago al banco",
            "debit": 0,
            "credit": 10,
            "Count": "Pagos",
            "accountTypeId": 5,
            "voucherId": 28
        }
    ];

    // Iterar sobre el nuevo array JSON y añadirlo a la tabla
    jsonArray.forEach(function (item) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.voucherId}</td>
            <td>${item.contact}</td>
            <td>${item.descriptionVoucher}</td>
            <td>${item.voucherId}</td>
            <td>${item.Count}</td>
            <td>${item.credit}</td>
            <td>${item.debit}</td>
        `;
        tableBody.appendChild(newRow);

        totalDebit += parseFloat(item.debit) || 0;
        totalCredit += parseFloat(item.credit) || 0;
    });

    // Actualizar totales y diferencia
    totalDebitElement.textContent = totalDebit.toFixed(2);
    totalCreditElement.textContent = totalCredit.toFixed(2);
    const difference = totalDebit - totalCredit;
    differenceElement.textContent = difference.toFixed(2);
}

fillTable();

function getLocalStorage() {
    return localStorage.getItem("list-voucher") ?
        JSON.parse(localStorage.getItem("list-voucher")) :
        [];
}
