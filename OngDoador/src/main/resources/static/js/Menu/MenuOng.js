function CarregarMenuOng() {

    const ong = JSON.parse(localStorage.getItem("usuarioLogado"));

    const nomeMenu = document.getElementById("nomeMenu");
    const avatarMenu = document.getElementById("avatarMenu");

    if (ong == null) {

        alert("Nenhuma ONG logada.");
        window.location.href = "TelaEntrar.html";
        return;

    }

    if (nomeMenu) {

        nomeMenu.innerHTML = ong.nomeFantasia;

    }

    if (avatarMenu) {

        avatarMenu.innerHTML = ong.nomeFantasia.charAt(0).toUpperCase();

    }

}

function toggleUserMenu() {

    document.getElementById("userDropdown").classList.toggle("open");

}

document.addEventListener("click", function (e) {

    const menu = document.querySelector(".user-menu-wrap");

    if (menu && !menu.contains(e.target)) {

        document.getElementById("userDropdown").classList.remove("open");

    }

});

function Sair() {

    localStorage.removeItem("usuarioLogado");

    document.getElementById("userDropdown").classList.remove("open");

    window.location.href = "TelaInicio.html";

}

window.addEventListener("load", CarregarMenuOng);