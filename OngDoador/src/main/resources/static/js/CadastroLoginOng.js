const API_SALVAR_ONG = "http://localhost:8001/ong/salvar";
const API_LOGIN_ONG = "http://localhost:8001/ong/login";

function salvarEtapaUm() {

    const dadosOng = {
        nomeFantasia: document.getElementById('nomeFantasia').value,
        cnpj: document.getElementById('cnpj').value,
        areaAtuacao: document.getElementById('areaAtuacao').value,
        emailOng: document.getElementById('emailOng').value,
        descricao: document.querySelector('textarea').value
    };

    if (
        dadosOng.nomeFantasia == "" ||
        dadosOng.cnpj == "" ||
        dadosOng.areaAtuacao == "" ||
        dadosOng.emailOng == ""
    ) {
        alert("Preencha todos os campos obrigatórios!");
    } else {
        localStorage.setItem("dadosOng", JSON.stringify(dadosOng));
        window.location.href = "TelaCadastroOngEtapaDois.html";
    }
}


/* ===================================
   ETAPA 2
=================================== */

async function cadastroDeOng() {

    const dadosSalvos = JSON.parse(localStorage.getItem("dadosOng"));

    if (dadosSalvos == null) {

        alert("Dados da etapa 1 não encontrados!");

        window.location.href = "TelaCadastroOngEtapaUm.html";

    } else {

        const cadastroOng = {

            nomeFantasia: dadosSalvos.nomeFantasia,
            cnpj: dadosSalvos.cnpj,
            areaAtuacao: dadosSalvos.areaAtuacao,
            emailOng: dadosSalvos.emailOng,
            descricao: dadosSalvos.descricao,

            nomeGestor: document.getElementById('nomeGestor').value,
            cpfGestor: document.getElementById('cpfGestor').value,
            cargoGestor: document.getElementById('cargoGestor').value,
            emailGestor: document.getElementById('emailGestor').value,
            telefoneGestor: document.getElementById('telefoneGestor').value
        };

        if (validaCNPJ(cadastroOng.cnpj) == false) {

            alert("CNPJ inválido!");

        } else if (validaCNPJ(cadastroOng.cpfGestor) == false) {

            alert("CPF inválido!");

        } else {

            const response = await fetch(API_SALVAR_ONG, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(cadastroOng)
            });

            if (response.ok) {

                alert("ONG cadastrada com sucesso!");

                localStorage.removeItem("dadosOng");

                limparFormulario();

                window.location.href = "TelaEntrar.html";

            } else {

                alert("Erro ao cadastrar ONG!");
            }
        }
    }
}

async function logar() {

    const emailOng = document.getElementById("emailOng").value;
    const emailGestor = document.getElementById("emailGestor").value;

    if (emailOng == "" || emailGestor == "") {

        alert("Preencha os campos de login!");

    } else {

        const loginOng = {
            emailOng: emailOng,
            emailGestor: emailGestor
        };

        const response = await fetch(API_LOGIN_ONG, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginOng)
        });

        if (response.ok) {

            const ong = await response.json();

            if (ong != null) {

                localStorage.setItem("ongLogada", JSON.stringify(ong));

            } else {
               
			 alert("Erro ao processar dados do login!");
            }
        } else {
           
		 alert("Email ou senha inválidos!");
        }
		
    }
}

function validaCpfOng(cpf) {

    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length != 11) {
        return false;
    }
    if (
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function validaCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14) {
        return false;
    }

    if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
    ) {
        return false;
    }

    let tamanho = 12;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);

    let soma = 0;
    let pos = 5;

    for (let i = 0; i < tamanho; i++) {

        soma += numeros[i] * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos[0]) {
        return false;
    }
    tamanho = 13;
    numeros = cnpj.substring(0, tamanho);

    soma = 0;
    pos = 6;

    for (let i = 0; i < tamanho; i++) {
        soma += numeros[i] * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos[1]) {
        return false;
    }
    return true;
}

function limparFormulario() {

    document.getElementById('nomeFantasia').value = "";
    document.getElementById('cnpj').value = "";
    document.getElementById('areaAtuacao').value = "";
    document.getElementById('emailOng').value = "";
    document.querySelector('textarea').value = "";

    document.getElementById('nomeGestor').value = "";
    document.getElementById('cpfGestor').value = "";
    document.getElementById('cargoGestor').value = "";
    document.getElementById('emailGestor').value = "";
    document.getElementById('telefoneGestor').value = "";
}