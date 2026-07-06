const API_BUSCAR_NOME_ONG = "http://localhost:8000/ong/buscarnome";

const API_LOGIN_ONG = "http://localhost:8000/ong/loginOng";
const API_LOGIN_USUARIO = "http://localhost:8000/usuario/loginUsuario";

let tipoLogin = "";

/* =========================
   SELEÇÃO LOGIN
========================= */

document.getElementById('tipoDoador').onclick = function () {
    tipoLogin = "DOADOR";
};

document.getElementById('tipoOng').onclick = function () {
    tipoLogin = "ONG";
};


/* =========================
   LOGIN
========================= */

async function login() {

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    let api = "";
    let dados = null;

    if (tipoLogin == "DOADOR") {

        api = API_LOGIN_USUARIO;

        dados = {
            email: email,
            senha: senha
        };

    } else if (tipoLogin == "ONG") {

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
}


/* =========================
   BUSCAR ONG
========================= */

async function BuscarNomeOng(nome) {

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