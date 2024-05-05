window.onload = renderizaCalendario

var diasDoCalendario = document.getElementById("dias");

var linhaAtual = document.getElementById("linha1")

var meses = ["Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"]

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

function renderizaCalendario(){


    diasDoMes.forEach(dia => {
        linhaAtual.insertAdjacentHTML("beforeend", `<td>${dia}</td>`);
    
        if (dia % 7 == 0) {
            idTr++;
    
            diasDoCalendario.insertAdjacentHTML("beforeend", `<tr id='linha${idTr}'></tr>`)
    
            linhaAtual = document.getElementById(`linha${idTr}`)
        }
    })
}


