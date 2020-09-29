
/*
$(function(){

    function validateEmail(_$email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( _$email );
    }
    function clearErrorMessage(_errorField){
        setTimeout(function (){
            _errorField.text("");
            _errorField.removeClass("show");
        }, 1500)
    }
    $('#sendEmail').on('click', function (){
        let name = $('#contact-name').val().trim();
        let email = $('#contact-email').val().trim();
        let message = $('#contact-message').val().trim();
        let errorField = $('#messAlert');

        if(name === ''){
            errorField.addClass( "show" );
            errorField.text("Enter name!");
            clearErrorMessage(errorField);
            return false;
        }else if(email === ''){
            errorField.addClass( "show" );
            errorField.text("Enter email!");
            clearErrorMessage(errorField);
            return false;
        }else if(message.length < 5){
            errorField.addClass( "show" );
            errorField.text("Write message more than 5 letters!");
            clearErrorMessage(errorField);
            return false;
        }else if( !validateEmail(email)){
            errorField.addClass( "show" );
            errorField.text("Enter correct email!")
            clearErrorMessage(errorField);
            return false;
        }
        clearErrorMessage(errorField);

        $.ajax({
            url: 'mail.php',
            method: 'POST',
            cache: false,
            data: {
                'name': name,
                'email': email,
                'message': message,
            },
            dataType: 'html',
            beforeSend: function () {
                $('#sendEmail').prop('disabled', true)
            },
            success: function (data) {
                errorField.removeClass('alert-danger');
                errorField.addClass('alert-success');
                errorField.text(data);
                $('#sendEmail').prop('disabled', false)
            }
        })
    })
});*/

$(document).ready(function() {

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Thank you!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });
});