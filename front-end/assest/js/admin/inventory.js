function inventoryFunction() {
    const addItem = $('#addItem'),
        updateItem = $('#updateItem'),
        deleteItem = $('#deleteItem'),
        showItemDetails = $('#showItemDetails'),
        itemFormTitle = $('#itemFormTitle'),
        itemPopupCancelBtn = $('#itemPopupCancelBtn'),
        itemTxtFieldBox = $('#itemTxtFieldBox'),
        itemDeletePopupBox = $('#itemDeletePopupBox'),
        itemPopupAddBtn = $('#itemPopupAddBtn'),
        itemFormIcon = $('#itemFormIcon'),
        itemFormContainer = $('#itemFormContainer'),
        itemPopupClose = $('#itemPopupClose'),
        imgUploader = $('#imgUploader');


    addItem.click(function () {
        home.addClass('show')
        itemPopupAddBtn.text("Save")
        itemPopupAddBtn.css('display', 'block');
        itemPopupCancelBtn.css('width', '48%');
        itemDeletePopupBox.css('display', 'none');
        itemTxtFieldBox.css('display', 'block');
        itemFormIcon.attr('src', '../assest/images/Frame07.png')
        itemFormTitle.text('Add Item')
        itemFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    updateItem.click(function () {
        home.addClass('show')
        itemFormTitle.text('Update Item')
        itemPopupAddBtn.css('display', 'block');
        itemPopupAddBtn.text("Update")
        itemPopupCancelBtn.css('width', '48%');
        itemDeletePopupBox.css('display', 'none');
        itemTxtFieldBox.css('display', 'block');
        itemFormIcon.attr('src', '../../assest/images/edit-btn.png')
        itemFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    deleteItem.click(function () {

    })
    showItemDetails.click(function () {
        itemFormTitle.text('Item Details')
        itemPopupAddBtn.css('display', 'none');
        itemPopupCancelBtn.css('width', '100%');
        itemFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        itemDeletePopupBox.css('display', 'none');
        itemTxtFieldBox.css('display', 'block');
        itemFormContainer.css('max-width', '800px')
        home.addClass('show')
        disableTxtField();
    })
    itemPopupClose.click(function () {
        home.removeClass('show');
        itemFormContainer.css('max-width', '800px')

    })
    itemPopupCancelBtn.click(function () {
        home.removeClass('show');
        itemFormContainer.css('max-width', '800px')

    })

    imgUploader.change(function () {
        var file = $(this)[0].files[0];
        if (file) {
            // $('#fileValue').text('Selected file: ' + file.name);
            console.log(file.name)
        } else {
            // $('#fileValue').text('No file selected');
        }
    });

}