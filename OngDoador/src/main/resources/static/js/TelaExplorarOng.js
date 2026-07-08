const API_LISTAR_CAMPANHAS = "http://localhost:8000/campanha/listartodos";

async function Campanhas() {
		
    const response = await fetch(API_LISTAR_CAMPANHAS);
	
    if (!response.ok) {
        alert("Erro ao carregar campanhas.");
        return;
    }

    const campanhas = await response.json();
    const container = document.getElementById("ongGrid");

    container.innerHTML = "";

    campanhas.forEach(campanha => {

        let porcentagem = (campanha.arrecadado / campanha.metaMensal) * 100;
		
		container.innerHTML += `
		    <div class="ong-card">
		        <div class="card-img">
		            <img src="${campanha.ong.logo}" alt="${campanha.ong.nomeFantasia}">
		            <span class="area-badge">${campanha.ong.areaAtuacao}</span>
		        </div>

		        <div class="card-body">
		            <h3>${campanha.nomeCampanha}</h3>

		            <p class="card-desc">
		                ONG: ${campanha.ong.nomeFantasia}
		            </p>

		            <div class="card-footer">
		                <div class="progress-labels">
		                    <span>R$ ${campanha.arrecadado}</span>
		                    <span class="muted">de R$ ${campanha.metaMensal}</span>
		                </div>

		                <div class="progress-bar">
		                    <div class="progress-fill" style="width:${porcentagem}%"></div>
		                </div>	
						<button class="btn-ver"
						        onclick="abrirCampanha(${campanha.id})">
						    Ver Detalhes
						</button>
		            </div>
		        </div>
		    </div>
		`;
    });
}



function abrirCampanha(id){

    localStorage.setItem("idCampanha", id);
    window.location.href = "TelaOng.html";
}


window.addEventListener("load", Campanhas);