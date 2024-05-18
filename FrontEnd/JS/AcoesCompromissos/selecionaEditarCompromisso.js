window.onload = consultar

async function consultar(){
    var options = {
        method: "get"
    };

    try{
        var retorno = await fetch(`http://localhost:8080/compromissos`, options)

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
    window.location.href = `editarCompromisso.html?id=${id}`
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}
