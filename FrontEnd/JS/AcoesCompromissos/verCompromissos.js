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
            document.getElementById("tabelaCompromissos").insertAdjacentHTML("beforeend", `<tr>
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

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}