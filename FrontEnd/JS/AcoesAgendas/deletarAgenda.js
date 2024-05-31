window.onload = pegaAgendas

async function pegaAgendas(){
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

    var agendas = await retorno.json()

    agendas.forEach(agenda => {
        document.getElementById("container").insertAdjacentHTML("afterbegin", `<div onclick="selecionaAgenda(${agenda.id})" class="agenda">
                                                                                    <p>${agenda.nome}</p>
                                                                                </div>`)
    })
}

function selecionaAgenda(id){
    document.getElementById("container").insertAdjacentHTML("afterend", `<div id="confirmaDeletar" class="confirmaDeletar">
                                                                                        <div>
                                                                                            <p>Você realmente deseja deletar este compromisso?</p>
                                                                                        </div>

                                                                                        <div class="containerButtons">
                                                                                            <button onclick="deleta(${id})" class="sim">Sim</button>
                                                                                            <button onclick="naoDeleta()" class="nao">Não</button>
                                                                                        </div>
                                                                                    </div>`);
}

async function deleta(id){
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

function naoDeleta(){
    document.getElementById("confirmaDeletar").remove();
}

function decodificaToken(token){
    var tokenDecodificado = jwt_decode(token)

    return tokenDecodificado;
}