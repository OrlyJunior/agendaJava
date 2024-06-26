window.onload = async () => {
    var variavel = new URLSearchParams(window.location.search)

    var variavelDeURL = variavel.get("id")

    criaAgendasNoSelect()

    await pegarCompromisso(variavelDeURL)
}

async function criaAgendasNoSelect() {
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

    var agendas = await retorno.json();

    agendas.forEach(agenda => {
        var selectAgendas = document.getElementById("agenda");

        selectAgendas.insertAdjacentHTML("beforeend", `<option onclick="renderizaCalendario()" value="${agenda.id}">${agenda.nome}</option>`)
    })
}

async function pegarCompromisso(id) {
    var options = {
        method: "get"
    }

    var retorno = await fetch(`http://localhost:8080/compromissos/id?id=${id}`, options)

    var compromisso = await retorno.json()

    console.log(compromisso)

    document.getElementById("desc").value = compromisso.descricao
    document.getElementById("data").value = compromisso.data
    document.getElementById("hora").value = compromisso.hora
    document.getElementById("cidade").value = compromisso.cidade
    document.getElementById("bairro").value = compromisso.bairro
    document.getElementById("rua").value = compromisso.rua
    document.getElementById("numero").value = compromisso.numero
    document.getElementById("agenda").value = compromisso.agendaId
}

async function editar() {
    var parametros = new URLSearchParams(window.location.search);

    var id = parametros.get("id");

    var desc = document.getElementById("desc").value;
    var data = `${document.getElementById("data").value}`;
    var hora = ` ${document.getElementById("hora").value}`;
    var cidade = document.getElementById("cidade").value;
    var bairro = document.getElementById("bairro").value;
    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("numero").value;
    var agenda = document.getElementById("agenda").value;

    var update = {
        id: id,
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
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    };

    try {
        var retorno = await fetch(`http://localhost:8080/compromissos`, options)

        window.location.href = "../home.html"
    } catch (e) {
        console.error(e);
    }
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}
