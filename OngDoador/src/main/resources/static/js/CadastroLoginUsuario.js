const API_SALVAR_USUARIO =
    "http://localhost:8001/usuario/salvar";

const API_LOGIN_USUARIO =
    "http://localhost:8001/usuario/login";

/* ===================================
   CADASTRAR USUÁRIO
=================================== */

async function cadastrar() {

    const usuario = {
        nomeCompleto: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        bairro: document.getElementById('bairro').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value
    };

    if(validaCPF (usuario.cpf)){
		alert("CPF INVÁLIDO")
		return;
	}

	const response = await fetch(
	       API_SALVAR_USUARIO,
	       {method: "POST",
	 
			 headers: {"Content-Type": "application/json"},
	           body: JSON.stringify(usuario)
	       }
	   );

	   if(response.ok){
		alert("Usuário cadastrado com sucesso!")
		limparFormulario();
		
	   } else {
	    alert("Erro ao cadastrar usuário!");
	}	
}


async function logar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        email: email,
        senha: senha
    };
	const doador = await response.json();
    const response = await fetch(API_LOGIN_USUARIO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (response.ok) {
        

        if (doador != null) {
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(doador)
            );
            alert("Login realizado com sucesso!");

            limparFormulario();
            window.location.href = "TelaInicio.html";
        }
      
    } else {
        alert("Email ou senha inválidos!");
    }
}

function validaCPF(cpf) {

    let Soma = 0;
    let Resto;

    let strCPF = String(cpf)
        .replace(/[^\d]/g, '');

    if (strCPF.length !== 11) {

        return false;

    }

    /* BLOQUEIA CPF REPETIDO */

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

    /* PRIMEIRO DÍGITO */

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

    /* SEGUNDO DÍGITO */

    for (let i = 1; i <= 10; i++) {

        Soma += parseInt(
            strCPF.substring(i - 1, i)
        ) * (12 - i);

    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {

        Resto = 0;

    }
    if (  Resto !== parseInt(strCPF.substring(10, 11))
    ) {
        return false;
   }
    return true;
}

/* ===================================
   LIMPAR FORMULÁRIO
=================================== */

function limparFormulario() {

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('logradouro').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('cpf').value = '';

}