const API_BUSCAR_ENDERECO_ONG = "http://192.168.10.22:8014/enderecoong/buscarPorOng";

window.onload = function () {

	    CarregarMenuOng();
	
	const ong = JSON.parse(localStorage.getItem("usuarioLogado"));


    if (ong == null) {

        alert("Nenhuma ONG logada.");
        return;

    }

    // Nome
    document.getElementById("nomeOng").innerHTML = ong.nomeFantasia;

    // Descrição do topo
    document.getElementById("descricaoOng").innerHTML = ong.descricao;

    // Resumo
    document.getElementById("descricaoResumo").innerHTML = ong.descricao;

    // Email, telefone e data de fundação
	document.getElementById("dadosOngHero").innerHTML =
	    "<span><strong>Email:</strong> " + ong.emailOng + "</span>" +
	    "<span><strong>Telefone:</strong> " + ong.telefone + "</span>" +
	    "<span><strong>Fundação:</strong> " + ong.dataFundacao + "</span>";

    // Buscar endereço
    BuscarEnderecoOng(ong.id);

};

async function BuscarEnderecoOng(id) {

    const response = await fetch(API_BUSCAR_ENDERECO_ONG + "/" + id);

    if (response.ok) {

        const endereco = await response.json();

        document.getElementById("cepOng").innerHTML = endereco.cepOng;
        document.getElementById("estadoOng").innerHTML = endereco.estado;
        document.getElementById("cidadeOng").innerHTML = endereco.cidade;
        document.getElementById("bairroOng").innerHTML = endereco.bairro;
        document.getElementById("logradouroOng").innerHTML = endereco.logradouro;
        document.getElementById("numeroOng").innerHTML = endereco.numero;
        document.getElementById("complementoOng").innerHTML = endereco.complemento;

        document.getElementById("localizacao").innerHTML =
            endereco.logradouro + ", " +
            endereco.numero + " - " +
            endereco.cidade + "/" +
            endereco.estado;

        console.log("Endereço carregado");

    } else {

        alert("Erro ao carregar endereço da ONG");

    }

}



