const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

<<<<<<< HEAD
let tipoLogin = "";
=======
let tipoLogin = "";//Variável que será usada para pegar o tipo de Login a ser acessada
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
/* =========================
   SELEÇÃO LOGIN
========================= */

document.getElementById('tipoDoador').onclick = function () {
    tipoLogin = "DOADOR";
=======

//ao clicar no tipo que for efetuar login vai armazenar na variável "tipo login"
document.getElementById("tipoDoador").onclick = function () {
    tipoLogin = "DOADOR";
}; 
//se como doador ou como ong
document.getElementById("tipoOng").onclick = function () {
    tipoLogin = "ONG";
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
};

<<<<<<< HEAD
document.getElementById('tipoOng').onclick = function () {
    tipoLogin = "ONG";
};
=======
async function login() {
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
=======
	//variáveis que pega do html os id dos inputs de email e senha 
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
/* =========================
   LOGIN
========================= */
=======
    let api = ""; // aqui dependendo da do que o usuário selecionar esta variável irá pegar a api de cada tipo se é doador ou ong
    let dados = {};
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
async function login() {
=======
    if (tipoLogin === "DOADOR") {
//se é doador puxa a api de doador , preenche os dados enail e senha e pega os dados somente que for do usuario
        api = API_LOGIN_USUARIO;
        dados = {
            email: email,
            senha: senha
        };
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
=======
    } else if (tipoLogin === "ONG") {
	//o mesmo so que com os dados da ong 	
        api = API_LOGIN_ONG;
        dados = {
            emailOng: email,
           senhaOng: senha
        };
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    let api = "";
    let dados = null;
=======
    } else {//obrigatporiedade de selecionar um tipo de login para definir qual api pegar
        alert("Selecione o Tipo de Login");
        return;
    }
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    if (tipoLogin == "DOADOR") {
=======
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados) //a espera de alguma 'api' pela chamada da variável "api" , faz o metodo POST e transforma o corpo em Json.
    });
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
        api = API_LOGIN_USUARIO;
=======
    if (response.ok) {
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
        dados = {
            email: email,
            senha: senha
        };
=======
        const dadosLogin = await response.json()
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    } else if (tipoLogin == "ONG") {
=======
        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(dadosLogin)
        );//se TUdo OK pega os dados em Json e amarzena no LocalStorage "usuarioLogado"
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
        api = API_LOGIN_ONG;
=======
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
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
        dados = {
            emailOng: email,
            senhaOng: senha
        };
=======
async function BuscarNomeOng(nome) {
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    } else {
=======
    const resultadoBusca = document.getElementById("resultadoBusca");
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
        alert("Selecione o Tipo de Login");
=======
    if (nome.length < 2) {
        resultadoBusca.innerHTML = "";
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
        return;
    }

<<<<<<< HEAD
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
=======
    const response = await fetch(`${API_BUSCAR_NOME_ONG}/${nome}`);
    const dados = await response.json();
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    if (!response.ok) {
        alert("Email ou senha inválidos.");
        return;
    }
=======
    console.log(dados);
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    // pega resposta como JSON direto
    const usuario = await response.json();

    if (usuario != null) {

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        if (tipoLogin == "DOADOR") {
            window.location.href = "TelaPrincipalDoador.html";
        } else {
            window.location.href = "TelaPrincipalGestorOng.html";
        }

    } else {
        alert("Erro ao processar login.");
    }
=======
    resultadoBusca.innerHTML = "";

    dados.forEach(ong => {

        resultadoBusca.innerHTML += `
            <div class="item-ong">
                ${ong.nomeFantasia}
            </div>
        `;

    });

    console.log("Busca funcionando");
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
}

// ajuda do chat para efeitos no html
function efeitosnoHTML() {

<<<<<<< HEAD
/* =========================
   BUSCAR ONG
========================= */
=======
    const tipoDoador = document.getElementById("tipoDoador");
    const tipoOng = document.getElementById("tipoOng");
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
async function BuscarNomeOng(nome) {
=======
    tipoDoador.addEventListener("click", function () {
        tipoDoador.classList.add("ativo");
        tipoOng.classList.remove("ativo");
    });
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    const resultadoBusca = document.getElementById("resultadoBusca");

    if (nome.length < 2) {
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
=======
    tipoOng.addEventListener("click", function () {
        tipoOng.classList.add("ativo");
        tipoDoador.classList.remove("ativo");
    });
}

window.onload = efeitosnoHTML;
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
