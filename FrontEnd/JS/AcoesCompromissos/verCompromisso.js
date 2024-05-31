window.onload = pegaCompromisso

var variavel = new URLSearchParams(window.location.search)

var variavelDeURL = variavel.get("id")

async function pegaCompromisso() {
    var options = {
        method: "get"
    }

    var retornoCompromisso = await fetch(`http://localhost:8080/compromissos/id?id=${variavelDeURL}`, options);

    var compromisso = await retornoCompromisso.json();

    var retornoAgenda = await fetch(`http://localhost:8080/agendas/id?id=${compromisso.agendaId}`);

    var agenda = await retornoAgenda.json();

    mostraCompromisso(compromisso, agenda);
}

function mostraCompromisso(compromisso, agenda) {
    document.getElementById("descricao").innerHTML = compromisso.descricao
    document.getElementById("agenda").innerHTML = agenda.nome
    document.getElementById("data").innerHTML = compromisso.data
    document.getElementById("hora").innerHTML = compromisso.hora
    document.getElementById("local").innerHTML = `${compromisso.cidade}, ${compromisso.bairro}, ${compromisso.rua}, ${compromisso.numero}`
}
