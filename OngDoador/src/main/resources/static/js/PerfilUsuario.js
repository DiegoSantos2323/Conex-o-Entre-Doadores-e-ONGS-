async function CarregarPerfil(){
	
	const usurio = JSON.parse(
		localStorage.getItem("usuarioLogado")
	);
	
	const btnEntrar =
	        document.getElementById("btnEntrar");

	    const btnCriarConta =
	        document.getElementById("btnCriarConta");

	    const btnPerfil =
	        document.getElementById("btnPerfil");

	    if (usuario) {

	        btnEntrar.hidden = true;
	        btnCriarConta.hidden = true;
	        btnPerfil.hidden = false;

	    } else {

	        btnEntrar.hidden = false;
	        btnCriarConta.hidden = false;
	        btnPerfil.hidden = true;
	    }
	}

	window.onload = verificarLogin;
	

