const API_BUSCAR_ENDERECO_ONG = "http://localhost:8000/enderecoong/buscarPorOng";


// Carregar dados da ONG logada
window.onload = function () {


    const ong = JSON.parse(localStorage.getItem("usuarioLogado"));


    if (ong == null) {

        alert("Nenhuma ONG logada.");

        return;

    }



    // Nome da ONG

    document.getElementById("nomeOng").innerHTML = ong.nomeFantasia;



    // Descrição curta do topo

    document.getElementById("descricaoOng").innerHTML = ong.descricao;



    // Resumo da ONG (somente descrição)

    document.getElementById("descricaoResumo").innerHTML = ong.descricao;




    // Dados da ONG no topo

    if (document.getElementById("dadosOngHero")) {


        document.getElementById("dadosOngHero").innerHTML =

            "CNPJ: " + ong.cnpj +
            "<br>Email: " + ong.emailOng +
            "<br>Telefone: " + ong.telefone +
            "<br>Área de atuação: " + ong.areaAtuacao +
            "<br>Fundada em: " + ong.dataFundacao;

    }



    // Buscar endereço

    BuscarEnderecoOng(ong.id);


};




// Buscar endereço da ONG

async function BuscarEnderecoOng(id) {


    const response = await fetch(`${API_BUSCAR_ENDERECO_ONG}/${id}`);



    if (response.ok) {


        const endereco = await response.json();



        // Endereço no topo

        document.getElementById("enderecoHero").innerHTML =

            endereco.logradouro + ", " +
            endereco.numero + " - " +
            endereco.cidade + "/" +
            endereco.estado;




        // Card localização

        if (document.getElementById("localizacao")) {


            document.getElementById("localizacao").innerHTML =

                endereco.logradouro + ", " +
                endereco.numero +
                "<br>" +
                endereco.bairro +
                " - " +
                endereco.cidade +
                "/" +
                endereco.estado +

                "<br><br>" +

                "CEP: " + endereco.cepOng +

                "<br>Estado: " + endereco.estado +

                "<br>Cidade: " + endereco.cidade +

                "<br>Bairro: " + endereco.bairro +

                "<br>Logradouro: " + endereco.logradouro +

                "<br>Número: " + endereco.numero +

                "<br>Complemento: " + endereco.complemento;


        }



        console.log("Endereço carregado");


    } else {


        alert("Erro ao carregar endereço da ONG");


    }

}