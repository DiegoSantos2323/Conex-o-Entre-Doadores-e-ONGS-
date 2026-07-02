const API_BUSCAR_CAMPANHAS = "http://localhost:8000/campanha/listartodos";
const API_DELETAR_CAMPANHA = "http://localhost:8000/campanha/deletar";

document.addEventListener("DOMContentLoaded", function(){

    carregarCampanhas();

});

async function carregarCampanhas(){

    const lista = document.querySelector(".campanha-list");

    const response = await fetch(API_BUSCAR_CAMPANHAS);

    const campanhas = await response.json();

    lista.innerHTML = "";

    campanhas.forEach(campanha => {

        lista.innerHTML += `

        <div class="campanha-card">

            <div class="campanha-header">

                <div class="campanha-esquerda">

                    <div class="icone-coracao">
					
                        ♡
                    </div>

                    <div class="campanha-info">

                        <h2>

                            ${campanha.nomeCampanha}

                            <span class="status">

                                🟢 ${campanha.status}

                            </span>

                        </h2>

                        <p>

                        📅 ${campanha.dataInicio} - ${campanha.dataFim}

                        • ${campanha.vidasImpactadas} vidas

                        </p>

                    </div>

                </div>

                <div class="botoes">

                    <button class="editar">

                        ✏ Editar

                    </button>

                    <button 
                    class="deletar"
                    onclick="deletarCampanha(${campanha.id})">
					
                      🗑 Excluir

                    </button>

                </div>

            </div>

            <div class="progresso-area">

                <div class="valores">

                    <span>

                    R$ ${campanha.arrecadado} arrecadados

                    </span>
					
                    <span>
					
                    Meta: R$ ${campanha.metaMensal}
					
                    </span>

                </div>

                <div class="barra">

                    <div class="barra-preenchida"
					
                    style="width:${campanha.progresso || 0}%">

                    </div>
                </div>		
            </div>
     </div>


        `;

    });

}

async function deletarCampanha(id){

    const confirmar = confirm("Deseja excluir essa campanha?");

    if(confirmar){

        const response = await fetch(
            `${API_DELETAR_CAMPANHA}/${id}`,
            {

                method:"DELETE"

            }
        );

        if(response.ok){

            alert("Campanha excluída com sucesso!");

            carregarCampanhas();

        }else{

            alert("Erro ao excluir campanha");

        }

    }

}