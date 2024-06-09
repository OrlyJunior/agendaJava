window.onload = pegaAgendas

async function pegaAgendas() {
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    try {
        var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

        var agendas = await retorno.json()

        if(agendas.length != 0){
            agendas.forEach(agenda => {
                document.getElementById("container").insertAdjacentHTML("afterbegin", `<div onclick="editarAgenda(${agenda.id})" class="agenda">
                                                                                        <p>${agenda.nome}</p>
                                                                                    </div>`)
            })
        }else{
            document.getElementById("container").insertAdjacentHTML("afterbegin", `<div class="agenda">
                                                                                        <p>Não foi possível encontrar os dados das suas agendas!</p>
                                                                                    </div>`)
        }
    } catch (e) {
        console.log(`Erro: ${e}`)
    }
}

function sair(){
    window.location.href = "../home.html"
}

function editarAgenda(id) {
    window.location.href = `editarAgenda.html?id=${id}`
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado
}