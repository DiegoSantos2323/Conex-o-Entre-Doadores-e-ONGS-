const API_SALVAR_DADOS_ONG = "http://192.168.10.22:8014/ong/salvarDados";
const API_SALVAR_ENDERECO = "http://192.168.10.22:8014/enderecoong/salvar";

// SALVAR DADOS DA ONG

async function salvarOng() {

    const ongLogada = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (ongLogada == null) {
        alert("Nenhuma ONG logada.");
        return;
    }

    let arquivoLogo = document.getElementById("logo").files[0];
    let nomeLogo = "";

    if (arquivoLogo != null) {
        nomeLogo = arquivoLogo.name;
    }

    const dadosOng = {

        id: ongLogada.id,

        dataFundacao: document.getElementById("foundedAt").value,

        telefone: document.getElementById("phone").value,

        logo: nomeLogo

    };

    const responseOng = await fetch(API_SALVAR_DADOS_ONG, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(dadosOng)

    });

    if (!responseOng.ok) {

        alert("Erro ao salvar dados da ONG.");
        return;

    }

    const ongAtualizada = await responseOng.json();

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(ongAtualizada)
    );

    // SALVAR ENDEREÇO

    const endereco = {

        cepOng: document.getElementById("cep").value,

        estado: document.getElementById("state").value,

        cidade: document.getElementById("city").value,

        bairro: document.getElementById("neighborhood").value,

        logradouro: document.getElementById("street").value,

        numero: document.getElementById("number").value,

        complemento: document.getElementById("complement").value,

        ong: {

            id: ongAtualizada.id

        }

    };

    const responseEndereco = await fetch(API_SALVAR_ENDERECO, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(endereco)

    });

    if (!responseEndereco.ok) {

        alert("Erro ao salvar endereço.");
        return;

    }

    alert("Dados da ONG salvos com sucesso!");

    window.location.href = "TelaPrincipalGestorOng.html";

}

window.onload = function () {

    CarregarMenuOng();

};