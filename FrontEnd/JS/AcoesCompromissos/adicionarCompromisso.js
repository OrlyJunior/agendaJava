async function adicionar(){
    var desc = document.getElementById("desc").value;
    var data = document.getElementById("data").value;
    var hora = document.getElementById("hora").value;
    var cidade = document.getElementById("cidade").value;
    var bairro = document.getElementById("bairro").value;
    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("numero").value;
    var agenda = document.getElementById("agenda").value;

    var update = {
        descricao: desc,
        data: data,
        hora: hora,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        agendaId: agenda,
        usuarioId: decodificaToken(localStorage.getItem("token")).dados.id
    }

    var options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    };

    try{
        var retorno = await fetch(`http://localhost:8080/compromissos`, options)

    console.log(retorno.text())
    }catch(e) {
        console.log(retorno.text())
        console.error(e);
    }
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}
