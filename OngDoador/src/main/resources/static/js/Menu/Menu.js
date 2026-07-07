function CarregarMenu() {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const menuVisitante = document.getElementById("menuVisitante");
    const menuUsuario = document.getElementById("menuUsuario");

    if (usuario) {

        if (menuVisitante) {
            menuVisitante.hidden = true; }
       

        if (menuUsuario) {
            menuUsuario.hidden = false; }

        const nomeMenu = document.getElementById("nomeMenu");
        if (nomeMenu) {
            nomeMenu.innerText = usuario.nomeCompleto;
        }
		
     const avatarMenu = document.getElementById("avatarMenu");

    } else {
		
        if (menuVisitante) {
            menuVisitante.hidden = false; }
      
         if (menuUsuario) {
            menuUsuario.hidden = true; }
      
    }
}

function Sair() {

    localStorage.removeItem("usuarioLogado");
    document.getElementById("userDropdown")?.classList.remove("open");
    window.location.href = "TelaInicio.html";
}

window.onload = CarregarMenu;