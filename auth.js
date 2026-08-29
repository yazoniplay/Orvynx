const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function showMessage(message, type = "") {
const element = document.getElementById("authMessage");

if (!element) return;

element.textContent = message;
element.className = `auth-message ${type}`;

}

if (loginForm) {
loginForm.addEventListener("submit", async (event) => {
event.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    if (!email || !password) {
        showMessage("Please enter your email and password.", "error");
        return;
    }

    showMessage("Authentication backend not connected yet.");
});

}

if (signupForm) {
signupForm.addEventListener("submit", async (event) => {
event.preventDefault();

    const name = document
        .getElementById("signupName")
        .value
        .trim();

    const email = document
        .getElementById("signupEmail")
        .value
        .trim();

    const password = document
        .getElementById("signupPassword")
        .value;

    if (!name || !email || !password) {
        showMessage("Please complete all fields.", "error");
        return;
    }

    if (password.length < 8) {
        showMessage(
            "Password must be at least 8 characters.",
            "error"
        );
        return;
    }

    showMessage("Authentication backend not connected yet.");
});

}
