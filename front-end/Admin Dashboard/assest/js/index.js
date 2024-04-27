const sideMenu = $('.aside');
const menuBtn = $('#menu-btn');
const closeBtn = $('#close-btn');
const darkMode = $('.dark-mode');

menuBtn.click(function () {
    sideMenu.style.display = 'block';
})

closeBtn.click(function () {
    sideMenu.style.display = 'none';
})

darkMode.click(function () {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.$('span:nth-child(1)').addClass().toggle('active')
    darkMode.$('span:nth-child(2)').addClass().toggle('active')
})

Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});