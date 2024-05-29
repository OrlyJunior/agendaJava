window.onload = pegaCompromisso

var variavel = new URLSearchParams(window.location.search)

var variavelDeURL = variavel.get("id")

async function pegaCompromisso() {
    var options = {
        method: "get"
    }

    var retornoCompromisso = await fetch(`http://localhost:8080/compromissos/id?id=${variavelDeURL}`, options);

    var compromisso = await retornoCompromisso.json();

    var retornoAgenda = await fetch(`http://localhost:8080/agendas/id?id=${compromisso[0].agendaId}`);

    var agenda = await retornoAgenda.json();

    mostraCompromisso(compromisso, agenda);
}

function mostraCompromisso(compromisso, agenda) {
    document.getElementById("descricao").innerHTML = compromisso[0].descricao
    document.getElementById("agenda").innerHTML = agenda.nome
    document.getElementById("data").innerHTML = compromisso[0].data
    document.getElementById("hora").innerHTML = compromisso[0].hora
    document.getElementById("local").innerHTML = `${compromisso[0].cidade}, ${compromisso[0].bairro}, ${compromisso[0].rua}, ${compromisso[0].numero}`
}
