window.onload = pegaAgendas

async function pegaAgendas() {
    var options = {
        method: "get"
    }

    try {
        var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

        var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

        var agendas = await retorno.json()

        if(agendas.length != 0){
            agendas.forEach(agenda => {
                document.getElementById("container").insertAdjacentHTML("afterbegin", `<div onclick="selecionaAgenda(${agenda.id})" class="agenda">
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

function selecionaAgenda(id) {
    document.getElementById("container").insertAdjacentHTML("afterend", `<div id="confirmaDeletar" class="confirmaDeletar">
                                                                                        <div>
                                                                                            <p>Você realmente deseja deletar esta agenda? Os compromissos dela também serão deletados!</p>
                                                                                        </div>

                                                                                        <div class="containerButtons">
                                                                                            <button onclick="deleta(${id})" class="sim">Sim</button>
                                                                                            <button onclick="naoDeleta()" class="nao">Não</button>
                                                                                        </div>
                                                                                    </div>`);
}

async function deleta(id) {
    var update = id

    console.log(update)

    var options = {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    };

    await fetch(`http://localhost:8080/agendas?id=${id}`, options)

    window.location.reload()
}

function naoDeleta() {
    document.getElementById("confirmaDeletar").remove();
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado;
}