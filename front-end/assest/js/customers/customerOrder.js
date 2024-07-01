function customerOrderFunction() {
    const customerType = $('#customerType'),
        orderCustomerId  = $('#orderCustomerId'),
        customerName = $('#customerName'),
        customerLevel = $('#customerLevel'),
        paymentMethod = $('#paymentMethod'),
        last4Digit = $('#last4Digit'),
        bankName = $('#bankName'),
        amount = $('#amount'),
        cardDiv = $('.cardDiv'),
        cashDiv = $('.cashDiv'),
        cus = $('.cus'),
        itm = $('.itm');

    customerType.change(function () {
        console.log($(this).val());
        orderCustomerId.val("")
        customerName.val("")
        customerLevel.val("")
        if ($(this).val() === 'Loyalty') {
            cus.removeClass('d-none');
            itm.addClass('mt-4')
            itm.removeClass('mt-2')
        } else {
            cus.addClass('d-none');
            itm.removeClass('mt-4')
            itm.addClass('mt-2')
        }
    })
    paymentMethod.change(function () {
        console.log($(this).val());
        last4Digit.val("")
        bankName.val("")
        amount.val("")
        if ($(this).val() === 'Cash Payment') {
            cardDiv.addClass('d-none');
            cashDiv.removeClass('d-none');
            
        } else if ($(this).val() === 'Card Payment'){
            cardDiv.removeClass('d-none');
            cashDiv.addClass('d-none');
        }
    })
    
}