async function editarAgenda(){
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

    var retorno = await fetch(`http://localhost:8080/agendas`, options)

    console.log(retorno.text())
}

function decodificaToken(token){
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado
}