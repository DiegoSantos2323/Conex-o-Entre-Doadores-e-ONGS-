function CarregarMenu(){

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

	
    if(usuario){
        document.getElementById("menuVisitante").hidden = true;
        document.getElementById("menuUsuario").hidden = false;
        document.getElementById("nomeMenu").innerText = usuario.nomeCompleto;

    }else{
        document.getElementById("menuVisitante").hidden = false;
        document.getElementById("menuUsuario").hidden = true;

    }
	const menuVisitante = document.getElementById("menuVisitante");
	const menuUsuario = document.getElementById("menuUsuario");
console.log(menuVisitante);
	console.log(menuUsuario);
}

function Sair() {

    localStorage.removeItem("usuarioLogado");

    document.getElementById("userDropdown")?.classList.remove("open");

    window.location.href = "TelaInicio.html";
}
window.onload = CarregarMenu;