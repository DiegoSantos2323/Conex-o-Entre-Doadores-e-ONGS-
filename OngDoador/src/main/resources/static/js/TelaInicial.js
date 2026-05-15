const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";


let editandoId= null;



async function BuscarNomeOng(nome){

    const resultadoBusca = document.getElementById("resultadoBusca");

	if(nome.length < 2){
	     resultadoBusca.innerHTML = "";
	     return;
	 }

    const response = await fetch(`${API_BUSCAR_NOME_ONG}/${nome}`);

    const dados = await response.json();

    resultadoBusca.innerHTML = "";

    dados.forEach(ong => {

        resultadoBusca.innerHTML += `
            <div class="item-ong">
                ${ong.nomeFantasia}
            </div>
        `;

    });

}