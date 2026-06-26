const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

let tipoLogin="";

document.getElementById('tipoDoador').onclick = function(){
	tipoLogin="DOADOR";
};

document.getElementById('tipoOng').onclick = function(){
	tipoLogin="ONG";
};

async function login(){

	const email = document.getElementById('email').value;
	const senha = document.getElementById('senha').value;

	let api = "";
	let dados;

	if(tipoLogin == "DOADOR"){
		api = API_LOGIN_USUARIO;

		dados = {
			email: email,
			senha: senha
		};

	}else if(tipoLogin == "ONG"){

		api = API_LOGIN_ONG;

		dados = {
			emailOng: email,
			senha: senha
		};
	}else{
		alert("Selecione o Tipo de Login");
		return;
	}

	const response = await fetch(api,{
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body: JSON.stringify(dados)
	});

	if(response.ok){
		alert("Login realizado com sucesso");
		
		if(tipoLogin === "DOADOR"){
		        window.location.href = "";
				
		    }else if(tipoLogin === "ONG"){
		        window.location.href = "";
		    }
	}else{
		alert("Email ou senha inválidos.");
	}
}

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

	console.log("Busca funcionando");
}




//ajuda do chat para efeitos no html
function efeitosnoHTML(){

	// HTML: id="tipoDoador"
	const tipoDoador = document.getElementById("tipoDoador");

	// HTML: id="tipoOng"
	const tipoOng = document.getElementById("tipoOng");

	tipoDoador.addEventListener("click", function() {
	    tipoDoador.classList.add("ativo");
	    tipoOng.classList.remove("ativo");
	});

	tipoOng.addEventListener("click", function() {

	    tipoOng.classList.add("ativo");
	    tipoDoador.classList.remove("ativo");
	});
}

window.onload = efeitosnoHTML;