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
    
        supplierPopupAddBtn.text("Save")
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupCancelBtn.css('width', '18%');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../../assest/images/Frame07.png')
        supplierFormTitle.text('Add Supplier')
        // supplierFormContainer.css('max-width', '800px')
        enableTxtField()
        $('.txt').val("")
        $('#supplierCategory').val($('#supplierCategory option:first').val());
        $('#supplierCode').attr('readonly', "");
        console.log("supplierFunction");
        generateNewSupplierId();
    })
    updateSupplier.click(function () {
    
        supplierFormTitle.text('Update Supplier')
        supplierPopupAddBtn.css('display', 'block');
        supplierPopupAddBtn.text("Update")
        supplierPopupCancelBtn.css('width', '18%');
        supplierTxtFieldBox.css('display', 'block');
        supplierFormIcon.attr('src', '../../assest/images/edit-btn.png')
        // supplierFormContainer.css('max-width', '800px')
        enableTxtField()
        $('#supplierCode').attr('readonly', "");
    })
    deleteSupplier.click(function () {

    })
    showSupplierDetails.click(function () {
        supplierFormTitle.text('Supplier Details')
        supplierPopupAddBtn.css('display', 'none');
        supplierPopupCancelBtn.css('width', '100%');
        supplierFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        supplierTxtFieldBox.css('display', 'block');
        
        disableTxtField();
    })

    $('#supplierPopupCancelBtn,#supplierPopupClose').click(function () {
        $('#tblSupplier tr').each(function () {
            $('#tblSupplier input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.txt').val("")
        $('#supplierCategory').val($('#supplierCategory option:first').val());
    });
    // $('#supplierPopupClose').click(function () {
    //     $('#tblSupplier tr').each(function () {
    //         $('#tblSupplier input[type="checkbox"]').not($(this)).prop('checked', false);
    //     })
    //     $('.txt').val("")
    //     $('#supplierCategory').val($('#employeeGender option:first').val());
    // });
    // $('#supplierPopupAddBtn').click(function () {
    //     $('#tblSupplier tr').each(function () {
    //         $('#tblSupplier input[type="checkbox"]').not($(this)).prop('checked', false);
    //     })
    //     $('.txt').val("")
    //     $('#supplierCategory').val($('#employeeGender option:first').val());
    // });
}