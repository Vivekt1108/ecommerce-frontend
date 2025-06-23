const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_messsage = document.getElementById("error_message");

//  Signup validation
function getSignupFormErrors(firstname, email, password, repeatPassword) {
    const errors = [];

    if (!firstname.trim()) errors.push("Name is required");
    if (!email.trim()) errors.push("Email is required");
    else if (!email.includes("@") || !email.includes(".")) errors.push("Invalid email format");

    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (password !== repeatPassword) errors.push("Passwords do not match");

    return errors;
}

// Login validation
function getLoginFormErrors(email, password) {
    const errors = [];

    if (!email.trim()) errors.push("Email is required");
    if (!password.trim()) errors.push("Password is required");

    return errors;
}

//  Save user to localStorage (used in signup)
function saveUserToLocalStorage(firstname, email, password) {
    const user = {
        firstname: firstname,
        email: email,
        password: password
    };
    localStorage.setItem(email, JSON.stringify(user));
}

//  Check credentials (used in login)
function checkLoginCredentials(email, password) {
    const userData = localStorage.getItem(email);
    if (!userData) return false;

    const user = JSON.parse(userData);
    return user.password === password;
}

//  Show errors on the page
function showErrors(errors) {
    error_messsage.innerHTML = ''; // clear previous errors
    errors.forEach(err => {
        const p = document.createElement("p");
        p.textContent = "⚠️ " + err;
        p.style.color = "red";
        p.style.margin = "5px 0";
        error_messsage.appendChild(p);
    });
}

//  Handle form submission (BOTH login and signup)
form.addEventListener('submit', (e) => {
    let errors = [];

    if (firstname_input) {
        // This is the signup form
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        );

        if (errors.length === 0) {
            e.preventDefault(); 
            saveUserToLocalStorage(
                firstname_input.value,
                email_input.value,
                password_input.value
            );
            alert("Account created successfully! <<<3");
            window.location.href = "login.html";
            return;
        }
    } else {
        // This is the login form
        errors = getLoginFormErrors(email_input.value, password_input.value);

        if (errors.length === 0) {
            e.preventDefault();
            const success = checkLoginCredentials(
                email_input.value,
                password_input.value
            );
            if (success) {
                window.location.href = "Items.html";
            } else {
                error_messsage.innerText = "Invalid email or password!";
            }
            return;
        }
    }

    // If there are errors, stop submission and show them
    e.preventDefault();
    // error_messsage.innerText = errors.join(", ");
    showErrors(errors);
});
