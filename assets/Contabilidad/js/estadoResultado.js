function fillTable() {
    const tableBody = document.querySelector('.body__table');
    const totalDebitElement = document.querySelector('.total-debit');
    const totalCreditElement = document.querySelector('.total-credit');
    const differenceElement = document.querySelector('.difference');

    let voucher = getLocalStorage();
    let totalDebit = 0;
    let totalCredit = 0;

    voucher.forEach(function (item) {
        if (item.dataArray) {
            item.dataArray.forEach(function (data) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.input_date}</td>
                    <td>${data.input_description}</td>
                    <td>${data.input_contact}</td>
                    <td>${data.select_bar}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                `;
                tableBody.appendChild(newRow);

                totalDebit += parseFloat(data.input_debit) || 0;
                totalCredit += parseFloat(data.input_credit) || 0;
            });
        }
    });

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
