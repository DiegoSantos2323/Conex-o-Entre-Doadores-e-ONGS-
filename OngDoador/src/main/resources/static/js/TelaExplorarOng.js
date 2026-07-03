const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";
const API_LISTAR_CAMPANHAS_ONG = "http://localhost:8000/campanha/listarporong";
const API_LISTAR_ONGS = "http://localhost:8000/ong/listartodos";


async function carregarOngs() {

    const response = await fetch(API_LISTAR_ONGS);

    if (!response.ok) {
        alert("Erro ao carregar as ONGs.");
        return;
    }

    const ongs = await response.json();
    const container = document.getElementById("ongGrid");

    container.innerHTML = "";
    ongs.forEach(ong => {
        container.innerHTML += `
            <div class="ong-card">
                <div class="card-img">
                    <img src="${ong.logo}" alt="${ong.nomeFantasia}">
                    <span class="area-badge">${ong.areaAtuacao}</span>
                </div>
				
                <div class="card-body">
                    <h3>${ong.nomeFantasia}</h3>
                    <p class="card-desc">
                        ${ong.descricao}
                    </p>
                    <div class="card-footer">
                        <a href="TelaOng.html?id=${ong.id}"
                           class="btn-ver">
                            Ver Detalhes
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

window.onload = carregarOngs;