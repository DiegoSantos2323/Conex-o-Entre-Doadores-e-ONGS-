const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

// Variável que armazenará o tipo de login selecionado
let tipoLogin = "";

// =========================
// SELEÇÃO DO TIPO DE LOGIN
// =========================

document.getElementById("tipoDoador").onclick = function () {
    tipoLogin = "DOADOR";
};

document.getElementById("tipoOng").onclick = function () {
    tipoLogin = "ONG";
};

// =========================
// LOGIN
// =========================

async function login() {

    // Pega os valores digitados
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

// =========================
// EFEITOS VISUAIS
// =========================

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