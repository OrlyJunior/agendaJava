window.onload = renderizaCalendario

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

    data.innerHTML = `${meses[primeiroDia.getMonth()]}, ${primeiroDia.getFullYear()}` ;

    console.log(meses[primeiroDia.getMonth()])

    console.log(dia.getMonth())

    for (var i = 0; i < celulaParaComecar; i++) {
        linhaAtual.insertAdjacentHTML("afterbegin", "<td></td>")

        celulasDaTabela++;
    }

    diasDoMes.forEach(dia => {
        linhaAtual.insertAdjacentHTML("beforeend", `<td>${dia}</td>`);

        celulasDaTabela++;

        if (celulasDaTabela % 7 == 0) {
            idTr++;

            diasDoCalendario.insertAdjacentHTML("beforeend", `<tr id='linha${idTr}'></tr>`)

            linhaAtual = document.getElementById(`linha${idTr}`);
        }
    })

    idTr = 1;

    celulaParaComecar = celulasDaTabela + 1;
}

function proximoMes(){
    mesNovo++;

    primeiroDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo, 1);

    ultimoDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo + 1, 0);

    renderizaCalendario();
}

function mesAnterior(){
    mesNovo--;

    primeiroDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo, 1);

    ultimoDia = new Date(dia.getFullYear(), dia.getMonth() + mesNovo + 1, 0);

    renderizaCalendario();
}