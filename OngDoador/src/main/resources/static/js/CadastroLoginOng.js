const API_SALVAR_ONG = "http://localhost:8000/ong/salvar";

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
        return alert("CPF Inválido!!");
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
        return alert("CPF Inválido!!");
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
        return alert("CPF Inválido!");
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
        return alert("CPF Inválido!!");
    }

	return true;
}
console.log(GestorCPF)
/* ===================================
   VALIDA CNPJ
=================================== */

function validaCNPJ(cnpj) {

    var b = [
        6, 5, 4, 3, 2,
        9, 8, 7, 6, 5,
        4, 3, 2
    ];

    var c = String(cnpj)
        .replace(/[^\d]/g, '');

    if (c.length !== 14)
        return alert("Inválido!");

    if (/0{14}/.test(c))
        return alert("Inválido!");

    for (
        var i = 0, n = 0;
        i < 12;
        n += c[i] * b[++i]
    );

    if (
        c[12] !=
        (((n %= 11) < 2) ? 0 : 11 - n)
    )
        return alert("Inválido!");

    for (
        var i = 0, n = 0;
        i <= 12;
        n += c[i] * b[i++]
    );

    if (
        c[13] !=
        (((n %= 11) < 2) ? 0 : 11 - n)
    )
        return alert("Inválido!");
		
		return true;
console.log(validaCNPJ);
}