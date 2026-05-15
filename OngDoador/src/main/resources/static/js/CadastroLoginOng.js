const API_SALVAR_ONG = "http://localhost:8001/ong/salvar";

/* Etapa 1*/

function salvarEtapaUm() {
    const dadosOng = {
        nomeFantasia: document.getElementById('nomeFantasia').value,
        cnpj: document.getElementById('cnpj').value,
        areaAtuacao: document.getElementById('areaAtuacao').value,
        emailOng: document.getElementById('emailOng').value
    };
    // salva temporariamente
    localStorage.setItem(
        "dadosOng",
        JSON.stringify(dadosOng)
    );

    // vai para etapa 2
    window.location.href =
        "TelaCadastroOngEtapaDois.html";
}
/*  Etapa 2 - FINALIZAR CADASTRO
 */

async function cadastroDeOng() {
	
    // recupera dados da etapa 1
    const dadosOng = JSON.parse(
        localStorage.getItem("dadosOng")
    );
    // monta objeto completo
    const cadastroOng = {
        // ETAPA 1
       nomeFantasia: dadosOng.nomeFantasia,
        cnpj: dadosOng.cnpj,
        areaAtuacao: dadosOng.areaAtuacao,
        emailOng: dadosOng.emailOng,
        // ETAPA 2
        nomeGestor: document.getElementById('nomeGestor').value,
        cpfGestor: document.getElementById('cpfGestor').value,
       cargoGestor: document.getElementById('cargoGestor').value,
       emailGestor: document.getElementById('emailGestor').value,
        telefoneGestor: document.getElementById('telefoneGestor').value

    };

    /* ==========================
       VALIDAÇÕES
    ========================== */
    // valida CNPJ
    if (!validaCNPJ(cadastroOng.cnpj)) {
        alert("CNPJ inválido!");
        return;
    }

    // valida CPF
    if (!GestorCPF(cadastroOng.cpfGestor)) {
        alert("CPF inválido!");
        return;
    }

    try {
        const response = await fetch(API_SALVAR_ONG, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cadastroOng)
        });

        if (response.ok) {
            alert("ONG cadastrada com sucesso!");
            // limpa cache temporário
            localStorage.removeItem("dadosOng");
            // redireciona
            window.location.href = "login.html";
        } else {
            alert("Erro ao cadastrar ONG!");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com servidor!");

    }
	limparFormulario();
}
/*  Login ONG*/

async function logar() {

    const emailOng =
        document.getElementById("emailOng").value;

    const emailGestor =
        document.getElementById("emailGestor").value;

    const loginOng = {

        emailOng: emailOng,

        emailGestor: emailGestor

    };

    const response = await fetch(
        "http://localhost:8000/ong/login",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginOng)

        }
    );

    if (response.ok) {

        const data = await response.json();

        localStorage.setItem(
            "ongLogada",
            JSON.stringify(data)
        );

        window.location.href = "TelaInicio.html";

    } else {

        alert("Email inválido!");

    }

}

/* ===================================
   VALIDA CPF
=================================== */

function GestorCPF(cpf) {

    let Soma = 0;
    let Resto;

    let strCPF = String(cpf)
        .replace(/[^\d]/g, '');

    if (strCPF.length !== 11) {
        return false;
    }

    if (
        strCPF === '00000000000' ||
        strCPF === '11111111111' ||
        strCPF === '22222222222' ||
        strCPF === '33333333333' ||
        strCPF === '44444444444' ||
        strCPF === '55555555555' ||
        strCPF === '66666666666' ||
        strCPF === '77777777777' ||
        strCPF === '88888888888' ||
        strCPF === '99999999999'
    ) {
        return false;
    }

    for (let i = 1; i <= 9; i++) {

        Soma += parseInt(
            strCPF.substring(i - 1, i)
        ) * (11 - i);

    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (
        Resto !==
        parseInt(strCPF.substring(9, 10))
    ) {
        return false;
    }

    Soma = 0;

    for (let i = 1; i <= 10; i++) {

        Soma += parseInt(
            strCPF.substring(i - 1, i)
        ) * (12 - i);

    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (
        Resto !==
        parseInt(strCPF.substring(10, 11))
    ) {
        return false;
    }

	return true;
}
console.log(GestorCPF)
/* ===================================
   VALIDA CNPJ
=================================== */

function validaCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14)
        return false;

    // elimina CNPJs inválidos conhecidos
    if (
        cnpj === "00000000000000" ||
        cnpj === "11111111111111" ||
        cnpj === "22222222222222" ||
        cnpj === "33333333333333" ||
        cnpj === "44444444444444" ||
        cnpj === "55555555555555" ||
        cnpj === "66666666666666" ||
        cnpj === "77777777777777" ||
        cnpj === "88888888888888" ||
        cnpj === "99999999999999"
    ) {
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);

    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {

        soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2)
            pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);

    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {

        soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function limparFormulario() {

    document.getElementById('nomeFantasia').value = '';
    document.getElementById('cnpj').value = '';
    document.getElementById('areaAtuacao').value = '';
    document.getElementById('emailOng').value = '';

    document.getElementById('nomeGestor').value = '';
    document.getElementById('cpfGestor').value = '';
    document.getElementById('cargoGestor').value = '';
    document.getElementById('emailGestor').value = '';
    document.getElementById('telefoneGestor').value = '';

    localStorage.removeItem("dadosOng");

}