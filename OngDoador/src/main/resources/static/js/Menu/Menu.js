function CarregarMenu() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const menuVisitante = document.getElementById("menuVisitante");
    const menuUsuario = document.getElementById("menuUsuario");
    
    const widgetVisitante = document.getElementById("widgetVisitante");
    const formularioDoacao = document.getElementById("formularioDoacao");

    if (usuario) {
        if (menuVisitante) menuVisitante.hidden = true; 
        if (menuUsuario) menuUsuario.hidden = false;
        
        if (widgetVisitante) widgetVisitante.hidden = true;
        if (formularioDoacao) formularioDoacao.hidden = false;

        const nomeMenu = document.getElementById("nomeMenu");
        if (nomeMenu) {
            nomeMenu.innerText = usuario.nomeCompleto;
        }
        
        const avatarMenu = document.getElementById("avatarMenu");
        if (avatarMenu && usuario.nomeCompleto) {
            avatarMenu.innerText = usuario.nomeCompleto.charAt(0).toUpperCase();
        }

    } else {
        if (menuVisitante) menuVisitante.hidden = false;
        if (menuUsuario) menuUsuario.hidden = true;  
        
        if (widgetVisitante) widgetVisitante.hidden = false;
        if (formularioDoacao) formularioDoacao.hidden = true; 
    }
}

function Sair() {
    localStorage.removeItem("usuarioLogado");
    document.getElementById("userDropdown")?.classList.remove("open");
    window.location.href = "TelaInicio.html";
}

window.addEventListener("load", CarregarMenu);