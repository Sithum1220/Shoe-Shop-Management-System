employee.forEach(employee => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${employee.employeeId}</td>
        <td>${employee.employeeName}</td>
        <td>${employee.address}</td>
        <td>${employee.phoneNumber}</td>
        <td class="primary">Details</td>`;
    tr.innerHTML = trContent;
    document.querySelector('#employeeTableBody').appendChild(tr);
});