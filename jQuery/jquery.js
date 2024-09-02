$(document).ready(function () {
  $(".inp1, .inp2").on("focus blur", function () {
    $(this).toggleClass("enlarged");
    $(".bg-image").toggleClass("blurred");

    var isValid = $(this).val().trim() !== "";
    $(this).css({
      borderColor: isValid ? "green" : "red",
      color: isValid ? "green" : "red",
      backgroundColor: isValid ? "aliceblue" : "mistyrose",
    });
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var isValid = true;
    var storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    var storedEmail = storedUser ? storedUser.email : null;
    var storedPassword = storedUser ? storedUser.password : null;

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored Email:", storedEmail);
    console.log("Stored Password:", storedPassword);

    if (
      !storedEmail ||
      !storedPassword ||
      email !== storedEmail ||
      password !== storedPassword
    ) {
      handleValidationError(
        "Invalid email or password. Please register an account to continue."
      );
      isValid = false;
    } else {
      alert("Login successful!");
    }

    if (isValid) {
      window.location.href = "Home.html";
      $("#loginForm")[0].reset();
      $(".inp1, .inp2").each(function () {
        $(this).css({
          borderColor: "",
          color: "",
          backgroundColor: "",
        });
      });
    }
  });

  function handleValidationError(errorMessage) {
    alert(errorMessage);
    $("#email, #password").css({
      borderColor: "red",
      color: "red",
      backgroundColor: "mistyrose",
    });
  }
});
