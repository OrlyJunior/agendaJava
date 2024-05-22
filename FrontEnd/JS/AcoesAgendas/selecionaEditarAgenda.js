window.onload = consultaAgendas

async function consultaAgendas() {
    var options = {
        method: "get"
    }

    var retorno = await fetch(`http://localhost:8080/agendas`)

    var agendas = await retorno.json()

    agendas.forEach(agenda => {
        document.getElementById("container").insertAdjacentHTML("afterbegin", `<div onclick="editarAgenda(${agenda.id})" class="agenda">
                                                                                    <p>${agenda.nome}</p>
                                                                                </div>`)
    })
}

function editarAgenda(id) {
    window.location.href = `editarAgenda.html?id=${id}`
}