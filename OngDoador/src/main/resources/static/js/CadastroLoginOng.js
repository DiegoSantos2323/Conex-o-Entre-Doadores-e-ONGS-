const API_SALVAR_ONG = "http://localhost:8000/ong/salvar";

async function cadastroDeOng() {

	    const cadastroOng = {

	        // ETAPA 1 - ONG
	        nomeFantasia: document.getElementById('nomeFantasia').value,
	        cnpj: document.getElementById('cnpj').value,
	        areaAtuacao: document.getElementById('areaAtuacao').value,
	        emailOng: document.getElementById('emailOng').value,
	        // ETAPA 2 - GESTOR
	        nomeGestor: document.getElementById('nomeGestor').value,
	        cpfGestor: document.getElementById('cpfGestor').value,
	        cargoGestor: document.getElementById('cargoGestor').value,
	        emailGestor: document.getElementById('emailGestor').value,
	        telefoneGestor: document.getElementById('telefoneGestor').value

	    };
	    console.log(cadastroOng);

	    const response = await fetch(API_SALVAR_ONG, {

	        method: "POST",

	        headers: {
	            "Content-Type": "application/json"
	        },

	        body: JSON.stringify(cadastroOng)
	    });
		if(response.ok){

		    alert("Usuário cadastrado com sucesso!");

		    window.location.href = "login.html";

		} else {

		    alert("Erro ao cadastrar usuário!");
		}

}
async function logar() {

    // captura campos
    const emailOng = document.getElementById("emailOng").value;
    const emailGestor = document.getElementById("emailGestor").value;

    // objeto login
    const loginOng = {
        emailOng: emailOng,
        emailGestor: emailGestor
    };

    // envia requisição para o backend
    const response = await fetch("http://localhost:8000/ong/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(loginOng)
    });

    // verifica resposta
    if (response.ok) {

        const data = await response.json();

        localStorage.setItem(
            "ongLogada",
            JSON.stringify(data)
        );

        // redireciona para página de usuário
        window.location.href = "ong.html";

    } else {

        alert("Email ou senha inválidos!");
    }
	

}