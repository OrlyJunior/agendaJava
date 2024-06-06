async function editarAgenda() {
    var pegaURL = new URLSearchParams(window.location.search);

    var variavelURL = pegaURL.get("id")

    var update = {
        id: variavelURL,
        nome: document.getElementById("nome").value,
        usuarioId: decodificaToken(localStorage.getItem("token")).dados.id,
        ativo: true
    }

    var options = {
        method: "put",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(update)
    }

    try {
        var retorno = await fetch(`http://localhost:8080/agendas`, options)

        window.location.href = "../home.html"
    } catch (e) {
        console.log(e)
    }
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado
}