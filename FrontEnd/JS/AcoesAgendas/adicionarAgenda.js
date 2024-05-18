async function adicionar(){
    var nome = document.getElementById("nome").value

    var update = {
        nome: nome,
        usuarioId: decodificaToken(localStorage.getItem("token")).dados.id
    }

    console.log(update.usuarioId)

    var options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    }

    await fetch(`http://localhost:8080/agendas`, options)
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}