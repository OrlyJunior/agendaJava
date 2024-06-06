window.onload = consultar

async function consultar(){
    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var options = {
        method: "get"
    };

    try{
        var retorno = await fetch(`http://localhost:8080/compromissos/usuarioId?usuarioId=${usuarioId}`, options)

        var compromissos = await retorno.json();

        if(compromissos.length != 0){
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
        }else{
            document.getElementById("tabelaCompromissos").insertAdjacentHTML("afterend", `<p>Não foi possível pegar os dados de seus compromissos!</p>`)
        }
    }catch(e) {
        console.error(e);
    }
}

function selecionou(id){
    window.location.href = `editarCompromisso.html?id=${id}`
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}
