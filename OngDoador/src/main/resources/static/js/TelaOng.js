const API_LISTAR_CAMPANHA_ID = "http://localhost:8000/campanha/listarporid";

let campanhaAtual = null;
let valorSelecionado = 0;

async function carregarCampanha(){

    const idCampanha = localStorage.getItem("idCampanha");

    const response = await fetch(API_LISTAR_CAMPANHA_ID + "/" + idCampanha);

    if(!response.ok){
        alert("Erro ao carregar campanha.");
        return;
    }

    const dados = await response.json();

    campanhaAtual = dados;

    document.getElementById("ong-logo").src = dados.ong.logo;
    document.getElementById("ong-nome").innerHTML = dados.ong.nomeFantasia;
    document.getElementById("ong-descricao").innerHTML = dados.ong.descricao;
    document.getElementById("ong-causa").innerHTML = dados.ong.areaAtuacao;

    document.getElementById("campanha-titulo").innerHTML = dados.nomeCampanha;
    document.getElementById("campanha-descricao").innerHTML = dados.descricao;
    document.getElementById("campanha-doacao-conseguimos").innerHTML = dados.comDoacaoConseguimos;
    document.getElementById("campanha-vidas-impactadas").innerHTML = dados.vidasImpactadas + " vidas impactadas";
    document.getElementById("campanha-valor-arrecadado").innerHTML = "R$ " + dados.arrecadado;
    document.getElementById("campanha-meta-mensal").innerHTML = "R$ " + dados.metaMensal;

    let porcentagem = 0;

    if(dados.metaMensal > 0){
        porcentagem = (dados.arrecadado / dados.metaMensal) * 100;
    }

    if(porcentagem > 100){
        porcentagem = 100;
    }

    document.getElementById("campanha-progresso-barra").style.width = porcentagem + "%";

    document.getElementById("campanha-progresso-porcentagem").innerHTML =
    porcentagem.toFixed(0) + "% da meta alcançada";
}
function abrirModalPagamento(){

    if(campanhaAtual == null){
        return;
    }

    document.getElementById("pixNomeOng").innerHTML =
    campanhaAtual.ong.nomeFantasia;

    document.getElementById("pixValor").innerHTML =
    "R$ " + valorSelecionado.toFixed(2);

    document.getElementById("modalPagamento").hidden = false;
}

function fecharModal(){
    document.getElementById("modalPagamento").hidden = true;
}

function selecionarValor(val, btn) {

    valorSelecionado = val;

    document.querySelectorAll(".valor-btn").forEach(b => b.classList.remove("active"));
    
    btn.classList.add("active");

    document.getElementById("outroValorWrap").style.display = "none";
}

function copiarCodigo(){

let codigo =
document.getElementById("pixCode");

codigo.select();
codigo.setSelectionRange(0,99999);

navigator.clipboard.writeText(
codigo.value
);

alert("Código PIX copiado!");

}

function copiarPix(){

    const codigo = document.getElementById("pixCode").textContent;

    navigator.clipboard.writeText(codigo);

    alert("Código PIX copiado!");

}


async function abrirModalPagamento(valor){

    valorSelecionado = valor;

    const response = await fetch(
        `http://localhost:8000/pix/gerar?valor=${valor.toFixed(2)}`
    );

    const data = await response.json();

    document.getElementById("pixNomeOng").innerHTML =   campanhaAtual.ong.nomeFantasia;
    document.getElementById("pixValor").innerHTML =   "R$ " + valor.toFixed(2);
    document.getElementById("pixCode").textContent =   data.payload;
    document.getElementById("qrCode").innerHTML =    `<img src="data:image/png;base64,${data.qrCodeBase64}" alt="QR Code PIX">`;
    document.getElementById("modalPagamento").hidden = false;

}

window.addEventListener("load", carregarCampanha);