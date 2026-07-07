const API_SALVAR_CAMPANHA = "http://localhost:8000/campanha/salvar";
const API_BUSCAR_ONG_POR_ID= "http://localhost:8000/ong/listarporid";


async function cadastrarCampanha(){
	
//'usuarioLogado' porque foi a chave que salva os dadosOng no login.
	const ongLogada  = JSON.parse(localStorage.getItem("usuarioLogado"));
	   if (ongLogada == null) {
	       alert("Nenhuma ONG logada.");
	       return;
	   }

	   const responseOng = await fetch(`${API_BUSCAR_ONG_POR_ID}/${ongLogada.id}`);
	   if (!responseOng.ok) {
	       alert("Erro ao localizar a ONG.");
	       return;
	   }

	   const ong = await responseOng.json();
	   const campanha = {

	       nomeCampanha: document.getElementById("titulo").value,
	       dataInicio: document.getElementById("startDate").value,
	       dataFim: document.getElementById("endDate").value,
	       status: document.getElementById("status").value,
	       vidasImpactadas: document.getElementById("impactLives").value,
	       descricao: document.getElementById("about").value,
	       comDoacaoConseguimos: document.getElementById("impactDesc").value,
	       arrecadado: document.getElementById("raised").value,
	       metaMensal: document.getElementById("goal").value,
	       ong: ong

	   };
	   console.log("ONG LOGADA:", ongLogada);
	   console.log("ONG BUSCADA:", ong);
	   console.log("CAMPANHA:", campanha);
	   console.log(JSON.stringify(campanha, null, 2));
	   console.log(campanha);
	   console.log(JSON.stringify(campanha));
    const response = await fetch(API_SALVAR_CAMPANHA, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(campanha)
		
    });

	const texto = await response.text();
	console.log(texto);
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