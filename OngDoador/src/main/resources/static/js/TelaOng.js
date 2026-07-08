const API_LISTAR_CAMPANHA_ID = "http://localhost:8000/campanha/listarporid";

async function carregarCampanha(){

    const idCampanha = localStorage.getItem("idCampanha");

    const response = await fetch(API_LISTAR_CAMPANHA_ID + "/" + idCampanha);

    if(!response.ok){
        alert("Erro ao carregar campanha.");
        return;
    }

    const dados = await response.json();

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

window.addEventListener("load", carregarCampanha);