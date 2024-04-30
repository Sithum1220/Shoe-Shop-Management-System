
function supplierFunction() {
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
        itemPopupClose = $('#itemPopupClose');



    addItem.click(function () {
        home.addClass('show')
        itemPopupAddBtn.text("Save")
        itemPopupAddBtn.css('display', 'block');
        itemPopupCancelBtn.css('width', '48%');
        itemDeletePopupBox.css('display', 'none');
        itemTxtFieldBox.css('display', 'block');
        itemFormIcon.attr('src', '../assest/images/Frame07.png')
        itemFormTitle.text('Add Supplier')
        itemFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    updateItem.click(function () {
        home.addClass('show')
        itemFormTitle.text('Update Supplier')
        itemPopupAddBtn.css('display', 'block');
        itemPopupAddBtn.text("Update")
        itemPopupCancelBtn.css('width', '48%');
        itemDeletePopupBox.css('display', 'none');
        itemTxtFieldBox.css('display', 'block');
        itemFormIcon.attr('src', '../assest/images/edit-btn.png')
        itemFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    deleteItem.click(function () {
        home.addClass('show')
        itemFormTitle.text('Delete Supplier')
        itemPopupAddBtn.text("Delete")
        itemPopupAddBtn.css('display', 'block');
        itemPopupCancelBtn.css('width', '48%');
        itemTxtFieldBox.css('display', 'none');
        itemDeletePopupBox.css('display', 'block');
        itemFormIcon.attr('src', '../assest/images/deleteIcon.png')
        itemFormContainer.css('max-width', '600px')
    })
    showItemDetails.click(function () {
        itemFormTitle.text('Supplier Details')
        itemPopupAddBtn.css('display', 'none');
        itemPopupCancelBtn.css('width', '100%');
        itemFormIcon.attr('src', '../assest/images/detailsIcon.png')
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

    function disableTxtField() {
        // $("#itemCode").prop('disabled', true);
        // $("#supplierName").prop('disabled', true);
        // $("#supplierBuilding").prop('disabled', true);
        // $("#supplierCity").prop('disabled', true);
        // $("#supplierLane").prop('disabled', true);
        // $("#supplierState").prop('disabled', true);
        // $("#supplierEmail").prop('disabled', true);
        // $("#supplierPostalCode").prop('disabled', true);
        // $("#supplierContactNumber01").prop('disabled', true);
        // $("#supplierContactNumber02").prop('disabled', true);
        $('.txt').attr('readonly',"");

    }

    function enableTxtField() {
        // $("#supplierCode").prop('disabled', false);
        // $("#supplierName").prop('disabled', false);
        // $("#supplierBuilding").prop('disabled', false);
        // $("#supplierCity").prop('disabled', false);
        // $("#supplierLane").prop('disabled', false);
        // $("#supplierState").prop('disabled', false);
        // $("#supplierEmail").prop('disabled', false);
        // $("#supplierPostalCode").prop('disabled', false);
        // $("#supplierContactNumber01").prop('disabled', false);
        // $("#supplierContactNumber02").prop('disabled', false);
        $('.txt').removeAttr('readonly');

    }
}