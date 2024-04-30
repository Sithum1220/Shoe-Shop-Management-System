
function supplierFunction() {
    const addSupplier = $('#addSupplier'),
        updateSupplier = $('#updateSupplier'),
        deleteSupplier = $('#deleteSupplier'),
        showSupplierDetails = $('#showSupplierDetails'),
        supplierFormTitle = $('#supplierFormTitle'),
        supplierPopupCancelBtn = $('#supplierPopupCancelBtn'),
        supplierTxtFieldBox = $('#supplierTxtFieldBox'),
        supplierDeletePopupBox = $('#supplierDeletePopupBox'),
        supplierPopupAddBtn = $('#supplierPopupAddBtn'),
        supplierFormIcon = $('#supplierFormIcon'),
        supplierFormContainer = $('#supplierFormContainer'),
        supplierPopupClose = $('#supplierPopupClose');



    addSupplier.click(function () {
        home.addClass('show')
        supplierPopupAddBtn.text("Save")
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupCancelBtn.css('width', '48%');
        supplierDeletePopupBox.css('display', 'none');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../assest/images/Frame07.png')
        supplierFormTitle.text('Add Supplier')
        supplierFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    updateSupplier.click(function () {
        home.addClass('show')
        supplierFormTitle.text('Update Supplier')
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupAddBtn.text("Update")
        supplierPopupCancelBtn.css('width', '48%');
        supplierDeletePopupBox.css('display', 'none');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../assest/images/edit-btn.png')
        supplierFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    deleteSupplier.click(function () {
        home.addClass('show')
        supplierFormTitle.text('Delete Supplier')
        supplierPopupAddBtn.text("Delete")
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupCancelBtn.css('width', '48%');
        supplierTxtFieldBox.css('display', 'none');
        supplierDeletePopupBox.css('display', 'block');
        supplierFormIcon.attr('src', '../assest/images/deleteIcon.png')
        supplierFormContainer.css('max-width', '600px')
        supplierFormContainer.css('max-transition', 'none')
    })
    showSupplierDetails.click(function () {
        supplierFormTitle.text('Supplier Details')
        supplierPopupAddBtn.css('display', 'none');
        supplierPopupCancelBtn.css('width', '100%');
        supplierFormIcon.attr('src', '../assest/images/detailsIcon.png')
        supplierDeletePopupBox.css('display', 'none');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormContainer.css('max-width', '800px')
        home.addClass('show')
        disableTxtField();
    })
    supplierPopupClose.click(function () {
        home.removeClass('show');
        supplierFormContainer.css('max-width', '800px')

    })
    supplierPopupCancelBtn.click(function () {
        home.removeClass('show');
        supplierFormContainer.css('max-width', '800px')

    })

    function disableTxtField() {
        $("#supplierCode").prop('disabled', true);
        $("#supplierName").prop('disabled', true);
        $("#supplierBuilding").prop('disabled', true);
        $("#supplierCity").prop('disabled', true);
        $("#supplierLane").prop('disabled', true);
        $("#supplierState").prop('disabled', true);
        $("#supplierEmail").prop('disabled', true);
        $("#supplierPostalCode").prop('disabled', true);
        $("#supplierContactNumber01").prop('disabled', true);
        $("#supplierContactNumber02").prop('disabled', true);
    }

    function enableTxtField() {
        $("#supplierCode").prop('disabled', false);
        $("#supplierName").prop('disabled', false);
        $("#supplierBuilding").prop('disabled', false);
        $("#supplierCity").prop('disabled', false);
        $("#supplierLane").prop('disabled', false);
        $("#supplierState").prop('disabled', false);
        $("#supplierEmail").prop('disabled', false);
        $("#supplierPostalCode").prop('disabled', false);
        $("#supplierContactNumber01").prop('disabled', false);
        $("#supplierContactNumber02").prop('disabled', false);
    }
}