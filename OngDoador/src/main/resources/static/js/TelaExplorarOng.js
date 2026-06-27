const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

async function BuscarNomeOng(nome){

    const resultadoBusca = document.getElementById("resultadoBusca");
	if(nome.length < 2){
	     resultadoBusca.innerHTML = "";
	     return;
	 }

    const response = await fetch(`${API_BUSCAR_NOME_ONG}/${nome}`);
    const dados = await response.json();
	console.log(dados);
	
    resultadoBusca.innerHTML = "";
    dados.forEach(ong => {

        resultadoBusca.innerHTML += `
            <div class="item-ong">
                ${ong.nomeFantasia}
            </div>
        `;

    });
	console.log("Busca funcionando")

}



async function abc(){

		const usuario = JSON.parse(
		    localStorage.getItem("usuarioLogado")
		);
		
		console.log(usuario);

		
}



