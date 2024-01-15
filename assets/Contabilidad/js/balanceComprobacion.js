function fillSecondTable() {
    const tableBody = document.querySelector('.body__table');
    const totalDebitElements = document.querySelectorAll('.total-debit');
    const totalCreditElements = document.querySelectorAll('.total-credit');
    const differenceElements = document.querySelectorAll('.difference');

    let voucher = getLocalStorage();

    let totalDebe = 0;
    let totalHaber = 0;
    let totalDeudor = 0;
    let totalAcredor = 0;
    let totalActivo = 0;
    let totalPasivo = 0;
    let totalPerdida = 0;
    let totalGanancia = 0;

    voucher.forEach(function (item) {
        if (item.dataArray) {
            item.dataArray.forEach(function (data) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${item.id}</td>
                    <td>${data.input_contact}</td>
                    <td>${data.input_description}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                    <td>${data.input_debit}</td>
                    <td>${data.input_credit}</td>
                `;
                tableBody.appendChild(newRow);
                totalDebe += parseFloat(data.input_debit) || 0;
                totalHaber += parseFloat(data.input_credit) || 0;
                totalDeudor += parseFloat(data.input_debit) || 0;
                totalAcredor += parseFloat(data.input_credit) || 0;
                totalActivo += parseFloat(data.input_debit) || 0;
                totalPasivo += parseFloat(data.input_credit) || 0;
                totalPerdida += parseFloat(data.input_debit) || 0;
                totalGanancia += parseFloat(data.input_credit) || 0;
            });
        }
    });

    totalDebitElements.forEach(element => element.textContent = totalDebe.toFixed(2));
    totalCreditElements.forEach(element => element.textContent = totalHaber.toFixed(2));
    differenceElements[0].textContent = (totalDebe - totalHaber).toFixed(2);
    differenceElements[1].textContent = (totalDeudor - totalAcredor).toFixed(2);
    differenceElements[2].textContent = (totalActivo - totalPasivo).toFixed(2);
    differenceElements[3].textContent = (totalPerdida - totalGanancia).toFixed(2);
}

fillSecondTable();

function getLocalStorage() {
    return localStorage.getItem("list-voucher") ?
        JSON.parse(localStorage.getItem("list-voucher")) :
        [];
}