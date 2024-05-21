window.onload = async () => {
    criaAgendasNoSelect()

    renderizaCalendario()

    pegaCompromissos()

    pegaNomeDoUsuario()
}

var diasDoCalendario = document.getElementById("dias");

var mesNovo = 0;

var linhaAtual;

var data = document.getElementById("data");

var meses = ["Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"];

var idTr = 1;

var dia = new Date();

var ano = dia.getFullYear();

var mes = dia.getMonth();

var primeiroDia = new Date(dia.getFullYear(), dia.getMonth(), 1);

var ultimoDia = new Date(dia.getFullYear(), dia.getMonth() + 1, 0);

var diasDaSemana = 7;

function pegaNomeDoUsuario() {
    var nome = decodificaToken(localStorage.getItem("token")).dados.user

    document.getElementById("nomeDoUsuario").innerHTML = nome;
}

function renderizaCalendario() {
    var diasDoMes = [];

    diasDoCalendario.innerHTML = "";

    diasDoCalendario.insertAdjacentHTML("afterbegin", `<tr id="linha1"></tr>`)

    linhaAtual = document.getElementById("linha1");

    for (var i = primeiroDia.getDate(); i <= ultimoDia.getDate(); i++) {
        diasDoMes.push(i);
    }

    var celulaParaComecar = primeiroDia.getDay();

    var celulasDaTabela = 0;

    data.innerHTML = `${meses[primeiroDia.getMonth()]}, ${primeiroDia.getFullYear()}`;

    for (var i = 0; i < celulaParaComecar; i++) {
        linhaAtual.insertAdjacentHTML("afterbegin", "<td></td>")

        celulasDaTabela++;
    }

    diasDoMes.forEach(dia => {
        var diaString = dia.toString()

        if(diaString.length == 1){
            dia = `0${dia}`
        }

        linhaAtual.insertAdjacentHTML("beforeend", `<td id="${primeiroDia.getMonth()}">${dia}</td>`);

        celulasDaTabela++;

        if (celulasDaTabela % 7 == 0) {
            idTr++;

            diasDoCalendario.insertAdjacentHTML("beforeend", `<tr id='linha${idTr}'></tr>`)

            linhaAtual = document.getElementById(`linha${idTr}`);
        }
    })

    idTr = 1;

    celulaParaComecar = celulasDaTabela + 1;

    pegaCompromissos();
}

function proximoMes() {
    mesNovo++;

    primeiroDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo, 1);

    ultimoDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo + 1, 0);

    renderizaCalendario();
}

function mesAnterior() {
    mesNovo--;

    primeiroDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo, 1);

    ultimoDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo + 1, 0);

    renderizaCalendario();
}

function mostraNavegacao() {
    document.getElementById("navegacao").classList.replace("navegacaoInvisivel", "navegacao")
}

function fecharNavegacao() {
    document.getElementById("navegacao").classList.replace("navegacao", "navegacaoInvisivel")
}

async function criaAgendasNoSelect(){
    var options = {
        method: "get"
    }

    var usuarioId = decodificaToken(localStorage.getItem("token")).dados.id

    var retorno = await fetch(`http://localhost:8080/agendas/usuarioId?usuarioId=${usuarioId}`, options)

    var agendas = await retorno.json();

    agendas.forEach(agenda => {
        var selectAgendas = document.getElementById("agenda");

        selectAgendas.insertAdjacentHTML("beforeend", `<option onclick="renderizaCalendario()" value="${agenda.id}">${agenda.nome}</option>`)
    })
}


async function pegaCompromissos() {
    var options = {
        method: "get"
    }

    var agendaId = document.getElementById("agenda").value

    var retorno = await fetch(`http://localhost:8080/compromissos/agendaId?agendaId=${agendaId}`, options)

    var compromissos = await retorno.json();

    console.log(compromissos)

    adicionaCompromissosAoCalendario(compromissos)
}

function adicionaCompromissosAoCalendario(compromissos) {
    for(var i = 0; i <= 31; i++){
        if(document.getElementsByTagName("td")[i] && document.getElementsByTagName("td")[i].classList.contains("compromisso")){
            
            document.getElementsByTagName("td")[i].classList.remove("compromisso")
        }
    }

    compromissos.forEach(compromisso => {
        var comp = compromisso.data;

        var anoDoCompromisso = comp.substring(0, 4)

        var mesDoCompromisso = comp.substring(5, 7)

        if (mesDoCompromisso[0] == 0) {
            mesDoCompromisso -= 0;
        }

        var diaDoCompromisso = comp.substring(8, 10)

        var td = "";

        var anoDoCalendario = document.getElementById("data").innerHTML.substring(6,10)

        if (document.getElementById(`${mesDoCompromisso - 1}`)) {
            for(var i = 0; i <= 31; i++){
                
                if(document.getElementsByTagName("td")[i]){
                    if(document.getElementsByTagName("td")[i].innerHTML == diaDoCompromisso){
                        td = document.getElementsByTagName("td")[i]
                    }
                }

                if (td.innerHTML == diaDoCompromisso && anoDoCalendario == anoDoCompromisso) {
                    td.classList.add("compromisso")
                }
            }
        }

        
        
    })
}

function decodificaToken(token) {
    var tokenDecodificado = jwt_decode(token);

    return tokenDecodificado;
}