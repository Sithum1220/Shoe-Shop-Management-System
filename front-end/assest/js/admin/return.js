function returnFunction() {
    const orderType = $('#orderType'),
        itemId = $('#itemId'),
        itemIdDiv = $('.itemId'),
        itemColor = $('#itemColor'),
        itemColorDiv = $('.itemColor'),
        itemSize = $('#itemSize'),
        itemSizeDiv = $('.itemSize'),
        supplierPopupCancelBtn = $('#supplierPopupCancelBtn'),
        supplierPopupAddBtn = $('#supplierPopupAddBtn'),
        returnPopupClose = $('#returnPopupClose');

    orderType.change(function () {
        console.log($(this).val());
        itemId.val("")
        itemColor.val("")
        itemSize.val("")
        if ($(this).val() === 'Full Order') {
            itemIdDiv.addClass('d-none');
            itemColorDiv.addClass('d-none');
            itemSizeDiv.addClass('d-none');

        } else if ($(this).val() === 'One Item'){
            itemIdDiv.removeClass('d-none');
            itemColorDiv.removeClass('d-none');
            itemSizeDiv.removeClass('d-none');
        }
    })
}

