var usersList = [];
// ====================> Sections Variables <===================
var signInSection = document.querySelector(".signInSection");
var loginSection = document.querySelector(".loginSection");
var myAlert = document.querySelector(".myAlert");
var mainSection = document.querySelector(".main")

// ==================> Buttons and Anchors Variables <===========
var signInAnchor = document.querySelector(".loginSection a");
var logInAnchor = document.querySelector(".signInSection a");
var logInBtn = document.querySelector("#loginBtn");
var signInBtn = document.querySelector("#signInBtn");
var closeMy = document.querySelector(".fa-x");

// ==================> Sign Up Variables <===========
var signInName = document.querySelector("#signInName");
var signInEmail = document.querySelector("#signInEmail");
var signInPassword = document.querySelector("#signInPassword");

// ==================> Login  Variables <===========
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var main = document.querySelector(".main");
var currentUser;
var userIndex = 0;

var logoutBtn = document.querySelector("#logout");

//  =======================> While open browser <================

if (localStorage.getItem("users") !== null) {
    usersList = JSON.parse(localStorage.getItem("users"));
    upadteEmailsDl();
    
    if (checkLoggedIn()) {
        main.lastElementChild.innerHTML = `Welcome ${usersList[currentUser].userName}`;
        showElement(main);
    }
}
if (usersList.length == 0) {
    hideElement(loginSection);
    showElement(signInSection);
    window.alert("There are no users Please sign in to add users")
}




// ============ validateions ============
function validateName() {
    var name = signInName.value;
    var regex = /^\w+\s\w+$/;
    if (regex.test(name)) {
        return true;
    }
    else {
        return false;
    }
}
function validateEmail() {
    var email = signInEmail.value;
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
        return true;
    }
    else {
        return false;
    }
}
function validatePassword() {
    var password = signInPassword.value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (regex.test(password)) {
        return true;
    }
    else {
        return false;
    }
}
function validateSignUpInputs(e) {
    var warning = e.parentElement.nextElementSibling;
    var checkIcon = e.nextElementSibling;

    if (e == signInName) {
        if (!validateName()) {
            showElement(warning);
        }
        else {
            hideElement(warning);
            showElement(checkIcon);
        }
    }
    if (e == signInEmail) {
        if (!validateEmail()) {
            showElement(warning);
        }
        else {
            hideElement(warning);
            showElement(checkIcon);
        }
    }
    if (e == signInPassword) {
        if (!validatePassword()) {
            showElement(warning);
        }
        else {
            hideElement(warning);
            showElement(checkIcon);
        }
    }
}
// =========================> Methods <=======================
function showElement(section) {
    section.classList.replace("d-none", "d-flex");
}
function hideElement(section) {
    section.classList.replace("d-flex", "d-none");
}
function addNewUser() {
    var user = {
        userName: signInName.value,
        email: signInEmail.value,
        password: signInPassword.value,
        loggedIn: false,
    }
    usersList.push(user);
    saveUsersData();
}
function saveUsersData() {
    localStorage.setItem("users", JSON.stringify(usersList));
}
function isUser() {
    var email = loginEmail.value;
    var password = loginPassword.value;
    for (var i = 0; i < usersList.length; i++) {
        if (email == usersList[i].email && password == usersList[i].password) {
            userIndex = i;
            return true;
        }
    }
    return false;
}
function login() {
    if (isUser()) {
        usersList[userIndex].loggedIn = true;
        saveUsersData();
        main.lastElementChild.innerHTML = `Welcome ${usersList[userIndex].userName}`;
        showElement(main);
    }
    else {
        showElement(myAlert);
    }
}
function checkLoggedIn() {
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].loggedIn) {
            currentUser = i;
            return true;
        }
    }
    return false;
}
function logout() {
    usersList[currentUser].loggedIn = false;
    saveUsersData();
    location.reload();

}

function upadteEmailsDl() {
    var content = ``;
    var emailsDl =document.querySelector("#emailsDl");

    for(var i = 0 ; i< usersList.length ; i++){
        content += `<option value="${usersList[i].email}">${usersList[i].email}</option>`
    }

    emailsDl.innerHTML = content;
    
}
// ============================> EventListener <=====================
signInAnchor.addEventListener("click", function () {
    hideElement(loginSection);
    showElement(signInSection);
});
logInAnchor.addEventListener("click", function () {
    hideElement(signInSection);
    showElement(loginSection);
});

logInBtn.addEventListener("click", login)
closeMy.addEventListener("click", function () {
    hideElement(myAlert);
})
signInName.addEventListener("input", function (e) {
    validateSignUpInputs(e.target);
});
signInEmail.addEventListener("input", function (e) {
    validateSignUpInputs(e.target);
});
signInPassword.addEventListener("input", function (e) {
    validateSignUpInputs(e.target);
});

signInBtn.addEventListener("click", function () {
    if (validateName() && validateEmail() && validatePassword()) {
        addNewUser();
        loginEmail.value = signInEmail.value;
        hideElement(signInSection);
        showElement(loginSection);

    }
    else {
        var myAlertH2 = document.querySelector(".myAlert h2");
        myAlertH2.innerHTML = `Please make sure that you entered the correct username, email, and password.`
        showElement(myAlert);
    }
})

logoutBtn.addEventListener("click",logout);