$(document).ready(function () {
  $(".rinp").on('focus blur', function () {
    $(this).toggleClass("enlarged");
    $(".bg-image").toggleClass("blurred");
  });


  function calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  $("#dob").change(function () {
    var dob = $(this).val();
    if (dob) {
      var age = calculateAge(dob);
      $("#age").val(age);
    }
  });

  $("#state").change(function () {
    var selectedState = $(this).val();
    var cities = {
      "kerala": ["Trivandrum", "Kochi", "Kozhikode"],
      "tamilnadu": ["Chennai", "Coimbatore", "Madurai"],
      "karnataka": ["Bangalore", "Mysore", "Hubli"],
      "maharashtra": ["Mumbai", "Pune", "Nagpur"],
      "uttarpradesh": ["Lucknow", "Kanpur", "Varanasi"]
    };

    var cityOptions = cities[selectedState] || ["Select your city"];
    var optionsHTML = cityOptions.map(city => `<option value="${city}">${city}</option>`).join("");
    $("#city").html(optionsHTML);
  });


  $("#registrationForm").submit(function (e) {
    e.preventDefault();

    var formData = {
      firstName: $("#firstName").val().trim(),
      lastName: $("#lastName").val().trim(),
      dob: $("#dob").val().trim(),
      age: $("#age").val().trim(),
      gender: $('input[name="gender"]:checked').val(),
      phoneNumber: $("#phoneNumber").val().trim(),
      email: $("#email").val().trim(),
      state: $("#state").val(),
      city: $("#city").val(),
      zip: $("#zip").val().trim(),
      password: $("#password").val().trim(),
      confirmPassword: $("#confirmPassword").val().trim()
    };
    $(".rinp").css({
      "borderColor": "",
      "color": "",
      "backgroundColor": ""
    });
    if (validateForm(formData)) {
      const user = {
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password
      };
      localStorage.setItem("registeredUser", JSON.stringify(user));

      alert("User Registered Successfully.");
      console.log("firstName:",formData.firstName);
      console.log("Email:",formData.email);
      console.log("password:",formData.password);
      $("#registrationForm")[0].reset();
      window.location.href = "Login.html";
    }
  });

  function validateForm(data) {
    var firstLetterPattern = /^[A-Za-z]/;
    if (!firstLetterPattern.test(data.firstName)) {
      handleValidationError("Please enter a valid name.", "#firstname");
      return false;
    }
    if (data.lastName === "") {
      handleValidationError("Last Name field is required.", "#lastName");
      return false;
    }
    if (data.dob === "") {
      handleValidationError("Date of Birth field is required.", "#dob");
      return false;
    }
    if (data.age === "") {
      handleValidationError("Age field is required.", "#age");
      return false;
    }
    if (!data.gender) {
      alert("Gender field is required.");
      return false;
    }
    if (data.email === "") {
      handleValidationError("Email field is required.", "#email");
      return false;
    }
    if (data.state === "") {
      handleValidationError("State field is required.", "#state");
      return false;
    }
    if (data.city === "") {
      handleValidationError("City field is required.", "#city");
      return false;
    }
  
    var zipPattern = /^\d{6}$/;
    if (!zipPattern.test(data.zip)) {
      handleValidationError("Please enter a valid 6-digit ZIP code.", "#zip");
      return false;
    }
    var phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(data.phoneNumber)) {
      handleValidationError("Please enter a valid 10-digit mobile number starting with 6-9.", "#phoneNumber");
      return false;
    }
    var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordPattern.test(data.password)) {
      handleValidationError("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.", "#password");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      handleValidationError("Passwords do not match.", "#confirmPassword");
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
