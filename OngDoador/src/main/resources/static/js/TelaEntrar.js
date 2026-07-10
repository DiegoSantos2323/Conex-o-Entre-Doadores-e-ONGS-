const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";
const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

let tipoLogin = "";

// Seleção do tipo de login
document.getElementById("tipoDoador").onclick = function () {
    tipoLogin = "DOADOR";
};

document.getElementById("tipoOng").onclick = function () {
    tipoLogin = "ONG";
};

// Login
async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let api = "";
    let dados = {};

    if (tipoLogin === "DOADOR") {

        api = API_LOGIN_USUARIO;
        dados = {
            email: email,
            senha: senha
        };

    } else if (tipoLogin === "ONG") {

        api = API_LOGIN_ONG;
        dados = {
            emailOng: email,
            senhaOng: senha
        };

    } else {
        alert("Selecione o Tipo de Login");
        return;
    }

    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (response.ok) {

        const dadosLogin = await response.json();

        localStorage.setItem( "usuarioLogado", JSON.stringify(dadosLogin)
        );
		
        alert("Login realizado com sucesso!");

        if (tipoLogin === "DOADOR") {
			
            window.location.href = "TelaPerfilUsuario.html";
        } else {
			
            window.location.href = "TelaPrincipalGestorOng.html";
        }

    } else {

        alert("Email ou senha inválidos.");
    }
}



// Efeitos visuais
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