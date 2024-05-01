function supplierFunction() {
    const addSupplier = $('#addSupplier'),
        updateSupplier = $('#updateSupplier'),
        deleteSupplier = $('#deleteSupplier'),
        showSupplierDetails = $('#showSupplierDetails'),
        supplierFormTitle = $('#supplierFormTitle'),
        supplierPopupCancelBtn = $('#supplierPopupCancelBtn'),
        supplierTxtFieldBox = $('#supplierTxtFieldBox'),
        supplierPopupAddBtn = $('#supplierPopupAddBtn'),
        supplierFormIcon = $('#supplierFormIcon'),
        smallPopupClose = $('#smallPopupClose'),
        smallPopupCancelBtn = $('#smallPopupCancelBtn'),
        smallPopupAddBtn = $('#smallPopupAddBtn'),
        smallPopupBox = $('#smallPopupBox'),
        smallFormTitle = $('#smallFormTitle'),
        smallFormIcon = $('#smallFormIcon'),
        supplierPopupClose = $('#supplierPopupClose');


    addSupplier.click(function () {
        home.addClass('show')
        supplierPopupAddBtn.text("Save")
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupCancelBtn.css('width', '48%');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../../assest/images/Frame07.png')
        supplierFormTitle.text('Add Supplier')
        // supplierFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    updateSupplier.click(function () {
        home.addClass('show')
        supplierFormTitle.text('Update Supplier')
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupAddBtn.text("Update")
        supplierPopupCancelBtn.css('width', '48%');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../../assest/images/edit-btn.png')
        // supplierFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    deleteSupplier.click(function () {
        home2.addClass('show2')
    })
    showSupplierDetails.click(function () {
        supplierFormTitle.text('Supplier Details')
        supplierPopupAddBtn.css('display', 'none');
        supplierPopupCancelBtn.css('width', '100%');
        supplierFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        supplierTxtFieldBox.css('display', 'block');
        home.addClass('show')
        disableTxtField();
    })
    supplierPopupClose.click(function () {
        home.removeClass('show');
    })
    supplierPopupCancelBtn.click(function () {
        home.removeClass('show');
    })

    smallPopupClose.click(function () {
        home2.removeClass('show2');
    })
    smallPopupCancelBtn.click(function () {
        home2.removeClass('show2');
    })
    smallPopupAddBtn.click(function () {
        home2.removeClass('show2');
    })
}