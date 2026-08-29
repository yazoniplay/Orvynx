const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function showMessage(message, type = "") {
    const element = document.getElementById("authMessage");

    if (!element) return;

    element.textContent = message;
    element.className = `auth-message ${type}`;
}


// ================================
// LOGIN
// ================================

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
            showMessage(
                "Enter your email and password.",
                "error"
            );
            return;
        }

        showMessage("Logging in...");

        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });

            if (error) {
                showMessage(error.message, "error");
                return;
            }

            if (!data.session) {
                showMessage(
                    "Login succeeded, but no session was created.",
                    "error"
                );
                return;
            }

            showMessage(
                "Login successful. Redirecting...",
                "success"
            );

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 500);

        } catch (error) {
            console.error(error);

            showMessage(
                "Unable to connect to the authentication server.",
                "error"
            );
        }
    });
}


// ================================
// SIGN UP
// ================================

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
            showMessage(
                "Complete all fields.",
                "error"
            );
            return;
        }

        if (password.length < 8) {
            showMessage(
                "Password must be at least 8 characters.",
                "error"
            );
            return;
        }

        showMessage("Creating your account...");

        try {
            const { data, error } =
                await supabaseClient.auth.signUp({
                    email,
                    password,

                    options: {
                        data: {
                            full_name: name
                        }
                    }
                });

            if (error) {
                showMessage(error.message, "error");
                return;
            }

            if (!data.session) {
                showMessage(
                    "Account created. Check your email to verify your account.",
                    "success"
                );
                return;
            }

            showMessage(
                "Account created. Redirecting...",
                "success"
            );

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 500);

        } catch (error) {
            console.error(error);

            showMessage(
                "Unable to connect to the authentication server.",
                "error"
            );
        }
    });
}
