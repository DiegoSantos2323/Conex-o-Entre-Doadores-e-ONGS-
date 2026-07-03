const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";
const API_LISTAR_CAMPANHAS = "http://localhost:8000/campanha/listartodos";


async function carregarCampanhas() {

    const response = await fetch(API_LISTAR_CAMPANHAS);
    if (!response.ok) {
        alert("Erro ao carregar campanhas.");
        return;
    }
    const campanhas = await response.json();
    const container = document.getElementById("ongGrid");
    container.innerHTML = "";
    campanhas.forEach(campanha => {
		
        container.innerHTML += `
            <div class="ong-card">
                <div class="card-img">
                    <img src="${campanha.ong.logo}" alt="${campanha.ong.nomeFantasia}">
                    <span class="area-badge">${campanha.ong.areaAtuacao ?? ""}</span>
                </div>
                <div class="card-body">
                    <h3>${campanha.nomeCampanha}</h3>
                    <p class="card-desc">
                        ONG: ${campanha.ong.nomeFantasia}
                    </p>
                    <div class="card-footer">
                        <div class="progress-labels">
                            <span>R$ ${campanha.arrecadado}</span>
                            <span class="muted">de R$ ${campanha.meta}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill"
                             style="width:${(campanha.arrecadado / campanha.meta) * 100}%">
                            </div>
                        </div>
                        <a href="TelaDoacao.html?id=${campanha.id}"
                           class="btn-ver">
                            Ver Detalhes 
                        </a>
                    </div>
					
                </div>
            </div>
        `;
	                                                                              
    });
}	//ao clicar em ver detalhes direciona pra "href="TelaDoacao.html?id=${campanha.id}"";       
window.onload = carregarCampanhas;

