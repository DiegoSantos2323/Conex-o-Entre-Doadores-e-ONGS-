function CarregarMenu() {

    const usuarioStorage = localStorage.getItem("usuarioLogado");

    const menuVisitante = document.getElementById("menuVisitante");
    const menuUsuario = document.getElementById("menuUsuario");

    if (usuarioStorage != null && usuarioStorage != "null" && usuarioStorage != "undefined") {

        const usuario = JSON.parse(usuarioStorage);

        if (usuario && usuario.nomeCompleto) {

            menuVisitante.hidden = true;
            menuUsuario.hidden = false;

            document.getElementById("nomeMenu").innerText = usuario.nomeCompleto;

        } else {

            menuVisitante.hidden = false;
            menuUsuario.hidden = true;
        }

    } else {

        menuVisitante.hidden = false;
        menuUsuario.hidden = true;
    }
<<<<<<< HEAD

    console.log("Menu visitante:", menuVisitante);
    console.log("Menu usuário:", menuUsuario);
=======
	
	const menuVisitante = document.getElementById("menuVisitante");
	const menuUsuario = document.getElementById("menuUsuario");
console.log(menuVisitante);
	console.log(menuUsuario);
>>>>>>> branch 'master' of https://github.com/DiegoSantos2323/Conex-o-Entre-Doadores-e-ONGS-.git
}

window.onload = CarregarMenu;

function Sair() {

    localStorage.removeItem("usuarioLogado");

    const dropdown = document.getElementById("userDropdown");

    if (dropdown != null) {
        dropdown.classList.remove("open");
    }

    window.location.href = "TelaInicio.html";
}