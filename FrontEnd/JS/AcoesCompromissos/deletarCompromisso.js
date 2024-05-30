window.onload = consultar

async function consultar(){
    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var options = {
        method: "get"
    };

    try{
        var retorno = await fetch(`http://localhost:8080/compromissos/usuarioId?usuarioId=${usuarioId}`, options)

        var compromissos = await retorno.json();

        compromissos.forEach(element => {
            document.getElementById("tabelaCompromissos").insertAdjacentHTML("beforeend", `<tr onclick="selecionou(${element.id})">
                                                                                                <td>${element.descricao}</td>
                                                                                                <td>${element.data}
                                                                                                <td>${element.cidade}</td>
                                                                                                <td>${element.bairro}</td>
                                                                                                <td>${element.rua}</td>
                                                                                                <td>${element.numero}</td>
                                                                                            </tr>`)
        })
    }catch(e) {
        console.error(e);
    }
}

function selecionou(id){
    document.getElementById("tabela").insertAdjacentHTML("afterend", `<div id="confirmaDeletar" class="confirmaDeletar">
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

    var compromisso = await fetch(`http://localhost:8080/compromissos`, options)

    window.location.reload()
}

function naoDeleta(){
    document.getElementById("confirmaDeletar").remove();
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}