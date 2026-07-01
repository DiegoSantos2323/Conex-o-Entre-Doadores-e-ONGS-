async function CarregarPerfil(){
	
	const usuario = JSON.parse(	localStorage.getItem("usuarioLogado")
	);
	
	document.getElementById('nomeUsuario').innerText = usuario.nomeCompleto;
	document.getElementById('emailUsuario').innerText = usuario.email;
	document.getElementById('nomeMenu').innerText = usuario.nomeCompleto;	
}

function Sair(){

    localStorage.removeItem("usuarioLogado");
    window.location.href = "TelaInicio.html";

}
	
window.onload= CarregarPerfil;