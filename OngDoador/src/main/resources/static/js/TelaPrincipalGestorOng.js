window.onload = function(){

// ABRIR E FECHAR DROPDOWN

let botaoUsuario = document.getElementById("btnUsuario");

let dropdown = document.getElementById("userDropdown");



botaoUsuario.onclick = function(){



    if(dropdown.style.display == "block"){


        dropdown.style.display = "none";


    }else{


        dropdown.style.display = "block";

    }

};

// BUSCAR USUÁRIO LOGADO

fetch("http://localhost:8001/usuario/listarporid/1")


.then(function(resposta){


    return resposta.json();

})

.then(function(usuario){

    console.log(usuario);

    // Nome do usuário no topo

    let nomeUsuario = document.querySelector(".user-btn span");

    nomeUsuario.innerHTML = usuario.nomeCompleto;

    // Primeira letra do avatar

    let avatar = document.querySelector(".user-avatar");


    avatar.innerHTML = usuario.nomeCompleto.charAt(0);


    // MENU FIXO DA ONG

    dropdown.innerHTML = `

    <a href="TelaPrincipalGestorOng.html" 
    class="user-dropdown-item">

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

// FECHAR CLICANDO FORA

document.addEventListener("click", function(event){


    let areaUsuario = document.querySelector(".user-menu-wrap");



    if(areaUsuario && !areaUsuario.contains(event.target)){


        dropdown.style.display = "none";

    }


});

// ===============================
// PREVIEW DA LOGO
// ===============================


function previewLogo(event){

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

}

}