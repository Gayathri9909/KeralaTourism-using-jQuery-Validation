const form = document.querySelector(".register-form form");
// const firstName = document.getElementById("first-name").addEventListener("focusin",myfunction);
// const lastName = document.getElementById("last-name");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirm-password");
// const dateOfBirth = document.getElementById("date-of-birth");
// const phonenumber = document.getElementById("phonenumber");
// const state = document.getElementById("state");
// const district = document.getElementById("district");
// const address = document.getElementById("address");
// Select all input fields
const inputs = [
    document.getElementById("first-name"),
    document.getElementById("last-name"),
    document.getElementById("email"),
    document.getElementById("password"),
    document.getElementById("confirm-password"),
    document.getElementById("date-of-birth"),
    document.getElementById("phonenumber"),
    document.getElementById("state"),
    document.getElementById("district"),
    document.getElementById("address")
];

// Attach the focus event to all input fields
inputs.forEach(input => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
});

function handleFocus(event) {
    event.target.style.backgroundColor = "aliceblue";
    event.target.style.color = "black";
}
function handleBlur(event) {
    event.target.style.backgroundColor = "red"; 
}
//form

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     validateInputs();
// })
function validateForm(event){
    event.PreventDefault();
    validateInputs()
}

function validateInputs() {
    checkBlank(firstName, "First name");
    checkBlank(lastName, "Last name");
    emailValidation();
    passwordValidation();
    confirmPasswordValidation();
    checkBlank(dateOfBirth, "Date of Birth");
    checkBlank(state, "State");
    checkBlank(district, "District");
    checkBlank(address, "Address");
}

function passwordValidation() {
    if (checkBlank(password, "Password")) {
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const digitPattern = /\d/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.value.length < 8) {
            setError(password, "Password must have 8 characters");
        }
        else if (!uppercasePattern.test(password.value)) {
            setError(password, "Password must have atleast 1 uppercase letter");
        }
        else if (!lowercasePattern.test(password.value)) {
            setError(password, "Password must have atleast 1 lowercase letter");
        }
        else if (!digitPattern.test(password.value)) {
            setError(password, "Password must have atleast 1 digit");
        }
        else if (!specialCharPattern.test(password.value)) {
            setError(password, "Password must have at least 1 special character");
        }
    }
}

function confirmPasswordValidation() {
    if (password.value !== confirmPassword.value){
        setError(confirmPassword, "Confirm password must be same as password")
    }
}

function emailValidation() {
    if (checkBlank(email, "Email")) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailPattern.test(email.value)) {
            setSuccess(email);
        }
        else {
            setError(email, "Invalid email address");
        }
    }
}


// Blank field check
function checkBlank(field, fieldName) {
    if (field.value === '') {
        setError(field, `${fieldName} cannot be empty`);
        return false;
    }
    else {
        setSuccess(field);
        return true;
    }
}

function myfunction(){
    document.getElementById("first-name").style.backgroundColor="aliceblue";
}


// State District Selection
let Kerala = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"];

let Karnataka = ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"];

let TamilNadu = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"];

state.addEventListener('change', (event) => { districtSelector(event); });

function districtSelector(event) {
    const stateSelected = event.target.value;
    let optionList;
    let districtOptions = "";
    switch (stateSelected) {
        case "Kerala": optionList = Kerala;
            break;
        case "Karnataka": optionList = Karnataka;
            break;
        case "Tamil Nadu": optionList = TamilNadu;
            break;
    }

    for (let i = 0; i < optionList.length; i++) {
        districtOptions += `<option value=${optionList[i]}>${optionList[i]}</option>`
    }
    district.innerHTML = districtOptions;
}

// Error Message
function setError(inputField, msg) {
    const formField = inputField.parentElement;
    const errorField = formField.querySelector(".error-field .error-msg");
    errorField.innerHTML = msg;
    errorField.style = "display:block";
    inputField.style = "border-bottom: 1px solid #ff3232";
}

// Success Field
function setSuccess(inputField) {
    const formField = inputField.parentElement;
    const errorField = formField.querySelector(".error-field .error-msg");
    inputField.style = "border-bottom: 1px solid #62ff32";
    errorField.style = "display:none";
}