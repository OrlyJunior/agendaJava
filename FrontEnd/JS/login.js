async function login() {
    var emailInput = document.getElementById("email").value;
    var senhaInput = document.getElementById("password").value;

    var update = {
        email: emailInput,
        password: senhaInput
    }

    const options = {
        method: "post",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(update)
    }

    try {
        const data = await fetch(`http://localhost:8080/users/login`, options)

        const token = data.text()
            .then(retorno =>
                localStorage.setItem("token", retorno)
            )

        if(decodificaToken(localStorage.getItem("token")).dados.ativo == true){
            window.location.href = "home.html";
        }
    } catch (e) {
        console.log(e)
    }
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}