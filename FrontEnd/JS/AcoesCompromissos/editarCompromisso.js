window.onload = () => {
    var variavel = new URLSearchParams(window.location.search)

    var variavelDeURL = variavel.get("id")

    pegarCompromisso(variavelDeURL)
}

async function pegarCompromisso(id) {
    var options = {
        method: "get"
    }

    var retorno = await fetch(`http://localhost:8080/compromissos/id?id=${id}`, options)

    var compromisso = await retorno.json()

    console.log(compromisso)

    document.getElementById("desc").value = compromisso[0].descricao
    document.getElementById("data").value = compromisso[0].data
    document.getElementById("hora").value = compromisso[0].hora
    document.getElementById("cidade").value = compromisso[0].cidade
    document.getElementById("bairro").value = compromisso[0].bairro
    document.getElementById("rua").value = compromisso[0].rua
    document.getElementById("numero").value = compromisso[0].numero
    document.getElementById("agenda").value = compromisso[0].agendaId
}

async function editar() {
    var parametros = new URLSearchParams(window.location.search);

    var id = parametros.get("id");

    var desc = document.getElementById("desc").value;
    var data = `${document.getElementById("data").value} ${document.getElementById("hora").value}`;
    var cidade = document.getElementById("cidade").value;
    var bairro = document.getElementById("bairro").value;
    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("numero").value;
    var agenda = document.getElementById("agenda").value;

    var update = {
        id: id,
        descricao: desc,
        data: data,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        agendaId: agenda,
        usuarioId: decodificaToken(localStorage.getItem("token")).dados.id
    }

    var options = {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    };

    try {
        var retorno = await fetch(`http://localhost:8080/compromissos`, options)

        console.log(retorno.text())
    } catch (e) {
        console.log(retorno.text())
        console.error(e);
    }
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}
