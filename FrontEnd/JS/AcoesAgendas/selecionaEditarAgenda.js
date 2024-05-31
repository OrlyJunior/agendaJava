window.onload = pegaAgendas

async function pegaAgendas(){
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

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