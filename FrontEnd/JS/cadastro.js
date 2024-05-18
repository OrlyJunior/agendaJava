async function cadastrar(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = document.getElementById("user").value;

    var update = {
        email: email,
        password: password,
        user: user
    }

    var options = {
        method: "post",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(update)
    }

    await fetch(`http://localhost:8080/users`, options)

    window.location.href = "login.html"
}