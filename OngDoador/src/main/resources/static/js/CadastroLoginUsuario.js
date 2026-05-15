const API_SALVAR_USUARIO = "http://localhost:8000/usuario/salvar";

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
  
	    const response = await fetch(API_SALVAR_USUARIO, {

	        method: "POST",

	        headers: {
	            "Content-Type": "application/json"
	        },

	        body: JSON.stringify(usuario)
	    });
		if(response.ok){

		    alert("Usuário cadastrado com sucesso!");

		    window.location.href = "login.html";//colocar tela de perfil criado 

		} else {

		    alert("Erro ao cadastrar usuário!");
		}	
	}


async function logar() {

    // captura campos
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // objeto login
    const usuario = {
        email: email,
        senha: senha
    };

    // envia requisição para o backend
    const response = await fetch("http://localhost:8000/usuario/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)
    });

    // verifica resposta
	if(response.ok){

	    alert("Usuário cadastrado com sucesso!");

	    limparFormulario();

	    setTimeout(() => {

	        window.location.href = "login.html";

	    }, 1000);

	}
	
}	

function validaCPF(cpf) {

    let Soma = 0;
    let Resto;

    let strCPF = String(cpf).replace(/[^\d]/g, '');

    if (strCPF.length !== 11) {
        return false;
    }

    // Bloqueia CPFs repetidos
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
        return alert("CPF INVÁlIDO");
    }

    // Primeiro dígito
    for (let i = 1; i <= 9; i++) {

        Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(9, 10))) {
        return alert("CPF INVÁlIDO");
    }

    Soma = 0;

    // Segundo dígito
    for (let i = 1; i <= 10; i++) {

        Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(10, 11))) {
        return alert("CPF INVÁlIDO");
    }

    return true;
}



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