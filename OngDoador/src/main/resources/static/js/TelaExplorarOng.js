const API_LISTAR_CAMPANHAS = "http://localhost:8000/campanha/listartodos";

async function carregarCampanhas() {

    const response = await fetch(API_LISTAR_CAMPANHAS);

    if (response.ok) {

        const campanhas = await response.json();
        const container = document.getElementById("ongGrid");

        if (container != null) {
            container.innerHTML = "";

            campanhas.forEach(campanha => {
                let arrecadado = 0;
                let meta = 1;
                let nomeOng = "ONG sem nome";
                let areaAtuacao = "";
                let logoOng = "";

                if (campanha.arrecadado != null) {
                    arrecadado = campanha.arrecadado;
                }

                if (campanha.metaMensal != null) {
                    meta = campanha.metaMensal;
                }

                if (campanha.ong != null) {

                    if (campanha.ong.nomeFantasia != null) {
                        nomeOng = campanha.ong.nomeFantasia;
                    }

                    if (campanha.ong.areaAtuacao != null) {
                        areaAtuacao = campanha.ong.areaAtuacao;
                    }

                    if (campanha.ong.logo != null) {
                        logoOng = campanha.ong.logo;
                    }
                }

                let porcentagem = (arrecadado / meta) * 100;

                if (porcentagem > 100) {
                    porcentagem = 100;
                }

                container.innerHTML += `
                <div class="ong-card">
                    <div class="card-img">
                        <img src="${logoOng}" alt="${nomeOng}">
                        <span class="area-badge">${areaAtuacao}</span>
                    </div>
                    <div class="card-body">
                        <h3>${campanha.nomeCampanha}</h3>
                        <p class="card-desc">ONG: ${nomeOng}</p>
                        <div class="card-footer">
                            <div class="progress-labels">
                                <span>R$ ${arrecadado}</span>
                                <span class="muted">de R$ ${meta}</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width:${porcentagem}%"></div>
                            </div>
                            <a href="TelaDoacao.html?id=${campanha.id}" class="btn-ver">
                                Ver Detalhes
                            </a>
                        </div>
                    </div>
                </div>`;
            });

        }
    }
}

window.addEventListener("load", carregarCampanhas);