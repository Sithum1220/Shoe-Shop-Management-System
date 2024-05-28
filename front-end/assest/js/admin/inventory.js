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
        inventoryPopupBtn.css('display', 'block');
        itemPopupCancelBtn.css('width', '18%');
        // itemDeletePopupBox.css('display', 'none');
        // itemTxtFieldBox.css('display', 'block');
        titleImg.attr('src', '../../assest/images/Frame07.png')
        popupTitle.text('Add Item')
        $('.dis').prop('disabled', false);
        $('.dis').val('')
        $('#itemCode').val('')
        $('#itemStatus').text('')
        $('#supplierName').text('')
        $('#itemImgViewer').attr('src','#')
        $('#itemImgUploader').prop('disabled', false);
        $('#addNew').prop('disabled', false);
        $('#tblInventory tr').each(function () {
            $('#tblInventory input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.dis, .txt').val("")
        $('#itemImg').attr('src', '#');
        enableTxtField()

    })
    updateItem.click(function () {
        popupTitle.text('Update Item')
        inventoryPopupBtn.css('display', 'block');
        inventoryPopupBtn.text("Update")
        itemPopupCancelBtn.css('width', '18%');
        titleImg.attr('src', '../../assest/images/edit-btn.png')
        enableTxtField()
        $('#itemCode').attr('readonly','')
        $('#itemImgUploader').prop('disabled', false);
        $('#addNew').prop('disabled', false);
        $('.dis').prop('disabled', false);
    })
    deleteItem.click(function () {

    })
    showItemDetails.click(function () {
        popupTitle.text('Item Details')
        inventoryPopupBtn.css('display', 'none');
        itemPopupCancelBtn.css('width', '100%');
        titleImg.attr('src', '../../assest/images/detailsIcon.png')
        disableTxtField();
        $('#itemImgUploader').prop('disabled', true);
        $('#addNew').prop('disabled', true);
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
        newInput.find('input').prop('disabled', false);

        // Append the new input fields to the container
        $('#inputContainer').append(newInput);
        
    });

    $('#itemPopupCancelBtn,#inventoryPopupClose').click(function () {
        $('#tblInventory tr').each(function () {
            $('#tblInventory input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.dis, .txt').val("")
        $('#itemStatus, #supplierName').text("")
        $('#itemImg').attr('src', '#');
        $('#itemImgViewer').attr('src', '#');
        $('#inputContainer .inputBox:not(:first)').remove();
        $('#itemColor, #itemSize, #itemQty').val('');
    });
  
}