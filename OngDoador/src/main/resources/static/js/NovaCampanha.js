const API_SALVAR_CAMPANHA = "http://localhost:8000/campanha/salvar";

async function cadastrarCampanha(){

    const campanha = {

        nomeCampanha: document.getElementById("titulo").value,

        dataInicio: document.getElementById("startDate").value,

        dataFim: document.getElementById("endDate").value,

        status: document.getElementById("status").value,

        vidasImpactadas: document.getElementById("impactLives").value,

        descricao: document.getElementById("about").value,

        comDoacaoConseguimos: document.getElementById("impactDesc").value,

        arrecadado: document.getElementById("raised").value,

        metaMensal: document.getElementById("goal").value

    };

    const response = await fetch(API_SALVAR_CAMPANHA, {

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body: JSON.stringify(campanha)

    });

    if(response.ok){

        alert("Campanha cadastrada com sucesso!");

        limparFormulario();
		
        window.location.href = "TelaCampanhasPrincipal.html";
    }else{

        alert("Erro ao cadastrar campanha!");

    }

}

function limparFormulario(){
	
    document.getElementById("titulo").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("status").value = "";
    document.getElementById("impactLives").value = "";
    document.getElementById("about").value = "";
    document.getElementById("impactDesc").value = "";
    document.getElementById("raised").value = "";
    document.getElementById("goal").value = "";
}