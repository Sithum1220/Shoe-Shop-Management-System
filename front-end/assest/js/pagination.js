function pagination() {
    const tableHeader = $('.table-header');
    const table = $('.mytable');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');
    const rowsPerPage = 10; // Change as needed
    let currentPage = 0;

    prevBtn.click(function() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            updateButtons();
        }
    });

    nextBtn.click( function() {
        const totalRows = table.find('tbody tr').length;
        if (currentPage < Math.ceil(totalRows / rowsPerPage) - 1) {
            currentPage++;
            showPage(currentPage);
            updateButtons();
        }
    });

    $(window).scroll(function() {
        const tableRect = table[0].getBoundingClientRect();
        const paginationContainer = $('.pagination-container');
        const paginationRect = paginationContainer[0].getBoundingClientRect();

        if (tableRect.bottom < paginationRect.height) {
            paginationContainer.css('bottom', `${tableRect.bottom - paginationRect.height}px`);
        } else {
            paginationContainer.css('bottom', '20px');
        }
    });

    function showPage(pageNumber) {
        const start = pageNumber * rowsPerPage;
        const end = start + rowsPerPage;

        const rows = table.find('tbody tr');
        rows.each(function(index, row) {
            if (index >= start && index < end) {
                $(row).show();
            } else {
                $(row).hide();
            }
        });
    }

    function updateButtons() {
        const totalRows = table.find('tbody tr').length;
        if (currentPage === 0) {
            prevBtn.prop('disabled', true);
        } else {
            prevBtn.prop('disabled', false);
        }

        if ((currentPage + 1) * rowsPerPage >= totalRows) {
            nextBtn.prop('disabled', true);
        } else {
            nextBtn.prop('disabled', false);
        }
    }

    showPage(currentPage);
    updateButtons();
}