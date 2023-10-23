// Referencing UI elements
const login = document.getElementById("login")
const username = document.getElementById("username");
const password = document.getElementById("password");
const icon = document.getElementById("icon")
const register = document.getElementById("register");

// Turn on/off visibility icon to show/hide password
icon.onclick = () => {
    if (password.type === "password") {
        password.type = "text";
        icon.src = "visibility_on.png";
    } else {
        password.type = 'password';
        icon.src = "visibility_off.png";
    }
}

// handling login button logic 
login.addEventListener("click", async () => {
    event.preventDefault();
    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ name: username.value, password: password.value}),
        });
        if (response.status === 201) {
            window.location.href = "flashcard.html"
        } else {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
        window.alert("Invalid Username or Password");
    }
});

// handling registration logic
register.addEventListener("click", async () => {
    event.preventDefault();
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ name: username.value, password: password.value}),
        });
        if (response.status === 201) {
            console.log('Registration Successful')
            window.alert("Registration Successful");
        } else {
            console.log('Not Successful');
        }
    } catch (error) {
        console.log(error)
    }
});

