function inventoryFunction() {
    const addItem = $('#addItem'),
        updateItem = $('#updateItem'),
        deleteItem = $('#deleteItem'),
        showItemDetails = $('#showItemDetails'),
        popupTitle = $('#popupTitle'),
        itemPopupCancelBtn = $('#itemPopupCancelBtn'),
        itemTxtFieldBox = $('#itemTxtFieldBox'),
        itemDeletePopupBox = $('#itemDeletePopupBox'),
        inventoryPopupBtn = $('#inventoryPopupBtn'),
        titleImg = $('#titleImg'),
        itemFormContainer = $('#itemFormContainer'),
        imgUploader = $('#imgUploader');


    addItem.click(function () {
        inventoryPopupBtn.text("Save")
        // itemPopupAddBtn.css('display', 'block');
        itemPopupCancelBtn.css('width', '18%');
        // itemDeletePopupBox.css('display', 'none');
        // itemTxtFieldBox.css('display', 'block');
        titleImg.attr('src', '../../assest/images/Frame07.png')
        popupTitle.text('Add Item')
        $('.dis').prop('disabled', false);
        $('.dis').val('')
        $('#itemCode').val('')
        enableTxtField()
    })
    updateItem.click(function () {
        popupTitle.text('Update Item')
        // itemPopupAddBtn.css('display', 'block');
        inventoryPopupBtn.text("Update")
        itemPopupCancelBtn.css('width', '18%');
        titleImg.attr('src', '../../assest/images/edit-btn.png')
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
        disableTxtField();
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

    $('#addNew').click(function() {
        // // Clone the first input fields
        // var newInput1 = $('.input-field:eq(0)').clone();
        // var newInput2 = $('.input-field:eq(1)').clone();
        // var newInput3 = $('.input-field:eq(2)').clone();
        //
        // // Clear their values
        // newInput1.find('input').val('');
        // newInput2.find('input').val('');
        // newInput3.find('input').val('');
        //
        // // Append the new input fields to the container
        // $('#inputContainer').append(newInput1, newInput2, newInput3);
        var newInput = $('.inputBox:last').clone();

        // Clear their values
        newInput.find('input').val('');

        // Append the new input fields to the container
        $('#inputContainer').append(newInput);
        
    });

    $('#itemPopupCancelBtn,#inventoryPopupClose').click(function () {
        $('#tblInventory tr').each(function () {
            $('#tblInventory input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.dis, .txt').val("")
    });
  
}