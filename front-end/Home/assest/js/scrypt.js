const formOpenBtn = $('#loginBtn'),
    home = $('.home'),
    form_container = $('.form-container'),
    form_close = $('.from_close'),
    loginBtn = $('#loginNow'),
    pwShowHide = $('.pw_hide'),
    adminBtn = $('#adminBtn'),
    cashierBtn = $('#cashierBtn'),
    adminInputBox = $('.adminInputBox'),
    cashierInputBox = $('.cashierInputBox');

formOpenBtn.click(function () {
    home.addClass('show')
    adminBtn.css("background", "#1F5F9F").css("color", "#fff");
    adminInputBox.css("display", "block");
    cashierInputBox.css("display", "none");
})
form_close.click(function () {
    home.removeClass('show');
    adminBtn.css("background", "white").css("color", "#000");
    cashierBtn.css("background", "white").css("color", "#000");
    adminInputBox.css("display", "block");
    cashierInputBox.css("display", "none");
})
cashierBtn.click(function () {
    adminBtn.css("background", "white").css("color", "#000");
    cashierBtn.css("background", "#1F5F9F").css("color", "#fff");
    adminInputBox.css("display", "none");
    cashierInputBox.css("display", "block");
})
adminBtn.click(function () {
    adminBtn.css("background", "#1F5F9F").css("color", "#fff");
    cashierBtn.css("background", "white").css("color", "#000");
    adminInputBox.css("display", "block");
    cashierInputBox.css("display", "none");
})