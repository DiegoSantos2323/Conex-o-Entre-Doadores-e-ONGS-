const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";



const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";

const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

<<<<<<< HEAD


let tipoLogin = "";//Variável que será usada para pegar o tipo de Login a ser acessada
=======
// Variável que armazenará o tipo de login selecionado
let tipoLogin = "";
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
=======
// =========================
// SELEÇÃO DO TIPO DE LOGIN
// =========================
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD



//ao clicar no tipo que for efetuar login vai armazenar na variável "tipo login"

=======
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
document.getElementById("tipoDoador").onclick = function () {

    tipoLogin = "DOADOR";
<<<<<<< HEAD

}; 

//se como doador ou como ong
=======
};
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

document.getElementById("tipoOng").onclick = function () {

    tipoLogin = "ONG";
<<<<<<< HEAD

=======
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
};

<<<<<<< HEAD

=======
// =========================
// LOGIN
// =========================
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

async function login() {

<<<<<<< HEAD


	//variáveis que pega do html os id dos inputs de email e senha 

=======
    // Pega os valores digitados
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

<<<<<<< HEAD


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
=======
    let api = "";
    let dados = {};
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
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
=======
    if (tipoLogin === "DOADOR") {

        api = API_LOGIN_USUARIO;

        dados = {
            email: email,
            senha: senha
        };

    } else if (tipoLogin === "ONG") {

        api = API_LOGIN_ONG;
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
async function BuscarNomeOng(nome) {
    const resultadoBusca = document.getElementById("resultadoBusca");
    if (nome.length < 2) {
        resultadoBusca.innerHTML = "";
=======
        dados = {
            emailOng: email,
            senhaOng: senha
        };

    } else {

        alert("Selecione o Tipo de Login");
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
        return;

    }

<<<<<<< HEAD
    const response = await fetch(`${API_BUSCAR_NOME_ONG}/${nome}`);
    const dados = await response.json();
    console.log(dados);
	
=======
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        alert("Email ou senha inválidos.");
        return;
    }

    const usuario = await response.json();

    if (usuario != null) {

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        alert("Login realizado com sucesso!");

        if (tipoLogin === "DOADOR") {
            window.location.href = "TelaPrincipalDoador.html";
        } else {
            window.location.href = "TelaPrincipalGestorOng.html";
        }

    } else {
        alert("Erro ao processar login.");
    }
}

// =========================
// BUSCAR ONG
// =========================

async function BuscarNomeOng(nome) {

    const resultadoBusca = document.getElementById("resultadoBusca");

    if (nome.length < 2) {
        resultadoBusca.innerHTML = "";
        return;
    }

    const response = await fetch(`${API_BUSCAR_NOME_ONG}/${nome}`);
    const dados = await response.json();

    console.log(dados);

>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
    resultadoBusca.innerHTML = "";
    dados.forEach(ong => {
        resultadoBusca.innerHTML += `
            <div class="item-ong">
                ${ong.nomeFantasia}
            </div>

        `;
    });

    console.log("Busca funcionando");
<<<<<<< HEAD

=======
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
}

<<<<<<< HEAD
// ajuda do chat para efeitos no html
=======
// =========================
// EFEITOS VISUAIS
// =========================
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

function efeitosnoHTML() {
<<<<<<< HEAD
=======

>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
    const tipoDoador = document.getElementById("tipoDoador");
<<<<<<< HEAD
=======
    const tipoOng = document.getElementById("tipoOng");
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
    const tipoOng = document.getElementById("tipoOng");

=======
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
    tipoDoador.addEventListener("click", function () {
        tipoDoador.classList.add("ativo");
        tipoOng.classList.remove("ativo");

    });
<<<<<<< HEAD
=======

>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
    tipoOng.addEventListener("click", function () {

        tipoOng.classList.add("ativo");
        tipoDoador.classList.remove("ativo");
    });
<<<<<<< HEAD
=======

}
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git

<<<<<<< HEAD
}
=======
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
window.onload = efeitosnoHTML;