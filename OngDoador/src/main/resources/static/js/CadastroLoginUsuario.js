const API_SALVAR_USUARIO = "http://localhost:8001/usuario/salvar";
const API_BUSCAR_NOME_ONG = "http://localhost:8001/ong/buscarnome";
const API_LOGIN_USUARIO = "http://localhost:8001/usuario/login";

async function cadastrar() {

    const usuario = {
        nomeCompleto: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        bairro: document.getElementById("bairro").value,
        logradouro: document.getElementById("logradouro").value,
        numero: document.getElementById("numero").value,
        senha: document.getElementById("senha").value,
        cpf: document.getElementById("cpf").value
    };

    if (!validaCPF(usuario.cpf)) {
        alert("CPF INVÁLIDO");
        return;
    }

    const response = await fetch(API_SALVAR_USUARIO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        limparFormulario();
        window.location.href = "TelaEntrar.html";
    } else {
        alert("Erro ao cadastrar usuário!");
    }
	
}

async function logar() {

    const usuario = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    const response = await fetch(API_LOGIN_USUARIO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (response.ok) {

        const doador = await response.json();

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(doador)
        );

        alert("Login realizado com sucesso!");

        limparFormulario();

        window.location.href = "TelaInicio.html";

    } else {
        alert("Email ou senha inválidos!");
    }
}

async function buscarCep(cep) {

    const response = await fetch(
        `https://viacep.com.br/ws/${cep.value}/json/`
    );

    const dados = await response.json();

    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("estado").value = dados.uf;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("logradouro").value = dados.logradouro;
}

async function BuscarNomeOng(nome) {

    const resultadoBusca = document.getElementById("resultadoBusca");

    if (nome.length < 2) {
        resultadoBusca.innerHTML = "";
        return;
    }

    const response = await fetch(
        `${API_BUSCAR_NOME_ONG}/${nome}`
    );

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

function validaCPF(cpf) {

    let soma = 0;
    let resto;

    const strCPF = String(cpf).replace(/[^\d]/g, "");

    if (strCPF.length !== 11) {
        return false;
    }

    if (
        strCPF === "00000000000" ||
        strCPF === "11111111111" ||
        strCPF === "22222222222" ||
        strCPF === "33333333333" ||
        strCPF === "44444444444" ||
        strCPF === "55555555555" ||
        strCPF === "66666666666" ||
        strCPF === "77777777777" ||
        strCPF === "88888888888" ||
        strCPF === "99999999999"
    ) {
        return false;
    }

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(strCPF.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(strCPF.substring(10, 11))) {
        return false;
    }

    return true;
}

function limparFormulario() {

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("cpf").value = "";
}