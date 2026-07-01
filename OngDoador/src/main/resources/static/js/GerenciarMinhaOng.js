document.addEventListener("DOMContentLoaded", function(){


// ===============================
// ELEMENTOS
// ===============================


let botaoUsuario = document.getElementById("btnUsuario");

let dropdown = document.getElementById("userDropdown");



console.log("Botão usuário:", botaoUsuario);

console.log("Dropdown:", dropdown);





// ===============================
// ABRIR E FECHAR DROPDOWN
// ===============================


if(botaoUsuario && dropdown){


    botaoUsuario.addEventListener("click", function(event){


        event.stopPropagation();



        console.log("Clicou no usuário");



        if(dropdown.style.display === "block"){


            dropdown.style.display = "none";


        }else{


            dropdown.style.display = "block";


        }


    });



}







// ===============================
// FECHAR CLICANDO FORA
// ===============================


document.addEventListener("click", function(event){


    let areaUsuario = document.querySelector(".user-menu-wrap");



    if(areaUsuario && !areaUsuario.contains(event.target)){


        dropdown.style.display = "none";


    }


});







// ===============================
// BUSCAR USUÁRIO LOGADO
// ===============================


fetch("http://localhost:8000/usuario/listarporid/1")



.then(function(resposta){


    return resposta.json();


})



.then(function(usuario){



    console.log("Usuário:", usuario);




    // Nome no botão


    let nomeUsuario = document.querySelector(".user-btn span");



    if(nomeUsuario){


        nomeUsuario.innerHTML = usuario.nomeCompleto;


    }




    // Avatar


    let avatar = document.querySelector(".user-avatar");



    if(avatar){


        avatar.innerHTML =
        usuario.nomeCompleto.charAt(0).toUpperCase();


    }







    // ===============================
    // MENU DROPDOWN
    // ===============================


    dropdown.innerHTML = `



    <a href="TelaPrincipalGestorOng.html"
    class="user-dropdown-item principal">


        <span>⌗</span>

        Principal


    </a>



    <a href="TelaGerenciarMinhaOng.html"
    class="user-dropdown-item">


        <span>♙</span>

        Gerenciar ONG


    </a>




    <a href="campanhas.html"
    class="user-dropdown-item">


        <span>⚑</span>

        Campanhas


    </a>




    <a href="relatorios.html"
    class="user-dropdown-item">


        <span>▤</span>

        Relatórios


    </a>




    <a href="saques.html"
    class="user-dropdown-item">


        <span>▣</span>

        Saques / Conta Bancária


    </a>




    <hr>




    <a href="ajuda.html"
    class="user-dropdown-item">


        <span>?</span>

        Central de Ajuda


    </a>





    <a href="configuracoes.html"
    class="user-dropdown-item">


        <span>⚙</span>

        Configurações


    </a>




    <hr>




    <a href="login.html"
    class="user-dropdown-item danger">


        <span>→</span>

        Sair


    </a>



    `;



})



.catch(function(erro){



    console.log("Erro ao buscar usuário:", erro);



});








// ===============================
// PREVIEW DA LOGO
// ===============================


window.previewLogo = function(event){



    let arquivo = event.target.files[0];



    if(!arquivo){


        return;


    }



    let leitor = new FileReader();




    leitor.onload = function(e){



        document.getElementById("logoImg").src = e.target.result;



        document.getElementById("logoPreview").style.display = "block";


    }




    leitor.readAsDataURL(arquivo);



};





});