function userFunction() {
    const changeUserPw = $('#changeUserPw'),
        deleteUser = $('#deleteUser'),
        showCredentialsDetails = $('#showCredentialsDetails'),
        smallPopupClose = $('#smallPopupClose'),
        smallPopupCancelBtn = $('#smallPopupCancelBtn'),
        smallPopupAddBtn = $('#smallPopupAddBtn'),
        smallPopupBox = $('#smallPopupBox'),
        smallFormTitle = $('#smallFormTitle'),
        smallFormIcon = $('#smallFormIcon'),
        smallPopupInput = $('#smallPopupInput'),
        supplierPopupClose = $('#supplierPopupClose');


    changeUserPw.click(function () {
        home2.addClass('show2')
        smallFormTitle.text('Change User Credentials')
        smallPopupAddBtn.css('display', 'block');
        smallPopupAddBtn.text("Change")
        smallPopupBox.addClass('d-none')
        smallPopupInput.removeClass('d-none')
        smallPopupCancelBtn.css('width', '48%');
        smallFormIcon.attr('src', '../../assest/images/edit-btn.png')
        enableTxtField()
    })
    deleteUser.click(function () {
        home2.addClass('show2')
        smallFormTitle.text('Delete User');
        smallPopupBox.removeClass('d-none');
        smallPopupInput.addClass('d-none');
        smallPopupAddBtn.text("Delete")
        smallPopupAddBtn.css('display', 'block');
        smallPopupCancelBtn.css('width', '48%');
        smallFormIcon.attr('src', '../../assest/images/deleteIcon.png')
    })
    showCredentialsDetails.click(function () {
        smallFormTitle.text('User Details')
        smallPopupAddBtn.css('display', 'none');
        smallFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        smallPopupInput.removeClass('d-none')
        smallPopupBox.addClass('d-none');
        smallPopupCancelBtn.css('width', '100%');
        home2.addClass('show2')
        disableTxtField();
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