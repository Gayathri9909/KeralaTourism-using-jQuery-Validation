$(document).ready(function () {
    $(".cinp, .cinp1, .cinp2, .cinp3").on('focus blur', function () {
        $(this).toggleClass("enlarged");
        $(".bg-image").toggleClass("blurred");

        validateField($(this));
    });

    function validateField($field) {
        var isValid = $field.val().trim() !== '';

        $field.css({
            "borderColor": isValid ? "green" : "red",
            "color": isValid ? "green" : "red",
            "backgroundColor": isValid ? "aliceblue" : "mistyrose"
        });
    }

    $('#contactForm').submit(function (e) {
        e.preventDefault();
        var formData = {
            firstName: $('#firstName').val().trim(),
            email: $('#email').val().trim(),
            phoneNumber: $('#phoneNumber').val().trim(),
            message: $('#message').val().trim()
        };
        var isValid = contactForm(formData); 

        if (isValid) {
    
            alert('Response Submitted Successfully');
            console.log("firstName:",formData.firstName);
            console.log("email:",formData.email);
            console.log("phoneNumber:",formData.phoneNumber);
            console.log("Message:",formData.message);
            $('#contactForm')[0].reset();
            $(".cinp, .cinp1, .cinp2, .cinp3").css({
                "borderColor": "",
                "color": "",
                "backgroundColor": ""
            });
        }
    });

    function contactForm(data) {
        
        var firstLetter = /^[A-Za-z]/;

        if (!firstLetter.test(data.firstName)) {
            handleValidationError("Please enter a valid name", "#firstName");
            return false;
        }
        if (data.email === "") {
            handleValidationError("Email field is required", "#email");
            return false;
        }
        var phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(data.phoneNumber)) {
            handleValidationError("Please enter a valid 10-digit mobile number starting with 6-9.", "#phoneNumber");
            return false;
        }
        if (data.message === "") {
            handleValidationError("Please enter some message", "#message");
            return false;
        }
        return true;
    }
    function handleValidationError(message, element) {
        alert(message);
        $(element).css({
            "borderColor": "red",
            "color": "red",
            "backgroundColor": "lavender"
        });
    }
});
