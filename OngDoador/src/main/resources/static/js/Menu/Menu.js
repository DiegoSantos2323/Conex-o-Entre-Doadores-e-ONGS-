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
}

function Sair(){

    localStorage.removeItem("usuarioLogado");

    window.location.href = "TelaInicio.html";

}
window.onload = CarregarMenu;