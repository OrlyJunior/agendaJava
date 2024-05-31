window.onload = pegaAgendas

async function pegaAgendas(){
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

    var agendas = await retorno.json()

    agendas.forEach(agenda => {
        document.getElementById("container").insertAdjacentHTML("afterbegin", `<div class="agendaV">
                                                                                    <p>${agenda.nome}</p>
                                                                                </div>`)
    })
}

function decodificaToken(token){
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado
}