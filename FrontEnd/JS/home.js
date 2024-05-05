window.onload = renderizaCalendario

var diasDoCalendario = document.getElementById("dias");

var linhaAtual = document.getElementById("linha1");

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

var diasDoMes = [];

for (var i = primeiroDia.getDate(); i <= ultimoDia.getDate(); i++) {
    diasDoMes.push(i);
}

function renderizaCalendario() {
    var celulasDaTabela = 0;

    data.innerHTML = meses[dia.getMonth()];

    for (var i = 0; i < primeiroDia.getDay(); i++) {        
        linhaAtual.insertAdjacentHTML("afterbegin", "<td></td>")

        celulasDaTabela++;
    }

    diasDoMes.forEach(dia => {
        linhaAtual.insertAdjacentHTML("beforeend", `<td>${dia}</td>`);

        celulasDaTabela++;

        if (celulasDaTabela % 7 == 0) {
            idTr++;

            diasDoCalendario.insertAdjacentHTML("beforeend", `<tr id='linha${idTr}'></tr>`)

            linhaAtual = document.getElementById(`linha${idTr}`)
        }
    })
}


