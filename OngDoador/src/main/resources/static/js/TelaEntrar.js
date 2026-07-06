const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

let tipoLogin = "";//Variável que será usada para pegar o tipo de Login a ser acessada


//ao clicar no tipo que for efetuar login vai armazenar na variável "tipo login"
document.getElementById("tipoDoador").onclick = function () {
    tipoLogin = "DOADOR";
}; 
//se como doador ou como ong
document.getElementById("tipoOng").onclick = function () {
    tipoLogin = "ONG";
};

async function login() {

	//variáveis que pega do html os id dos inputs de email e senha 
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let api = ""; // aqui dependendo da do que o usuário selecionar esta variável irá pegar a api de cada tipo se é doador ou ong
    let dados = {};

    if (tipoLogin === "DOADOR") {
//se é doador puxa a api de doador , preenche os dados enail e senha e pega os dados somente que for do usuario
        api = API_LOGIN_USUARIO;
        dados = {
            email: email,
            senha: senha
        };

    } else if (tipoLogin === "ONG") {
	//o mesmo so que com os dados da ong 	
        api = API_LOGIN_ONG;
        dados = {
            emailOng: email,
           senhaOng: senha
        };

    } else {//obrigatporiedade de selecionar um tipo de login para definir qual api pegar
        alert("Selecione o Tipo de Login");
        return;
    }

    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados) //a espera de alguma 'api' pela chamada da variável "api" , faz o metodo POST e transforma o corpo em Json.
    });

    if (response.ok) {

        const dadosLogin = await response.json()

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(dadosLogin)
        );//se TUdo OK pega os dados em Json e amarzena no LocalStorage "usuarioLogado"

        alert("Login realizado com sucesso!");
		
        if (tipoLogin === "DOADOR") {
            window.location.href = "TelaPerfilUsuario.html";//se estiverem selecionado o tipo como doador é direcionado para a tela de doador
        } else {
           window.location.href = "TelaPrincipalGestorOng.html";// ou para a tela de gestor
       }
    } else {
        alert("Email ou senha inválidos.");// se não cair em nenhuma das verificações ou o email ou a senha estão inválidos
    }
}

async function BuscarNomeOng(nome) {

    const resultadoBusca = document.getElementById("resultadoBusca");

    if (nome.length < 2) {
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

// ajuda do chat para efeitos no html
function efeitosnoHTML() {

    const tipoDoador = document.getElementById("tipoDoador");
    const tipoOng = document.getElementById("tipoOng");

    tipoDoador.addEventListener("click", function () {
        tipoDoador.classList.add("ativo");
        tipoOng.classList.remove("ativo");
    });

    tipoOng.addEventListener("click", function () {
        tipoOng.classList.add("ativo");
        tipoDoador.classList.remove("ativo");
    });
}

window.onload = efeitosnoHTML;