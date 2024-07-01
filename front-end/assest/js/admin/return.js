function returnFunction() {
    const orderType = $('#orderType'),
        itemId = $('#itemId'),
        itemIdDiv = $('.itemId'),
        itemColor = $('#itemColor'),
        itemColorDiv = $('.itemColor'),
        itemSize = $('#itemSize'),
        itemQty = $('#itemQty'),
        itemQtyDiv = $('.itemQty'),
        itemSizeDiv = $('.itemSize');

    orderType.change(function () {
        console.log($(this).val());
        itemId.val("")
        itemColor.val("")
        itemSize.val("")
        itemQty.val("")
        if ($(this).val() === 'Full Order') {
            itemIdDiv.addClass('d-none');
            itemColorDiv.addClass('d-none');
            itemSizeDiv.addClass('d-none');
            itemQtyDiv.addClass('d-none');

        } else if ($(this).val() === 'One Item'){
            itemIdDiv.removeClass('d-none');
            itemColorDiv.removeClass('d-none');
            itemSizeDiv.removeClass('d-none');
            itemQtyDiv.removeClass('d-none');
        }
    })
}

