const API_SALVAR_DADOS_ONG = "http://localhost:8000/ong/salvarDados";
const API_SALVAR_ENDERECO = "http://localhost:8000/enderecoong/salvar";


console.log("GerenciarMinhaOng.js carregado");


async function salvarOng() {


    try {


        const ongLogada = JSON.parse(localStorage.getItem("usuarioLogado"));


        if (ongLogada == null) {

            alert("Nenhuma ONG logada.");

            return;
        }


        console.log("ONG logada:");
        console.log(ongLogada);

        let arquivoLogo = document.getElementById("logo").files[0];

        let nomeLogo = "";


        if (arquivoLogo) {

            nomeLogo = arquivoLogo.name;

        }
        const dadosOng = {


            id: ongLogada.id,


            dataFundacao: document.getElementById("foundedAt").value,


            telefone: document.getElementById("phone").value,


            logo: nomeLogo


        };



        console.log("Dados ONG enviados:");
        console.log(dadosOng);



        const responseOng = await fetch(

            API_SALVAR_DADOS_ONG,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(dadosOng)

            }

        );



        if (!responseOng.ok) {


            const erro = await responseOng.text();


            console.log("Erro ONG:");
            console.log(erro);


            alert("Erro ao salvar dados da ONG!");

            return;

        }



        const ongAtualizada = await responseOng.json();



        localStorage.setItem(

            "usuarioLogado",

            JSON.stringify(ongAtualizada)

        );



        console.log("ONG salva:");
        console.log(ongAtualizada);





        // ============================
        // SALVAR ENDEREÇO
        // ============================



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



        console.log("Endereço enviado:");
        console.log(endereco);




        const responseEndereco = await fetch(

            API_SALVAR_ENDERECO,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(endereco)

            }

        );




        if (!responseEndereco.ok) {


            const erroEndereco = await responseEndereco.text();


            console.log("Erro endereço:");
            console.log(erroEndereco);


            alert("Erro ao salvar endereço!");

            return;

        }



        alert("Dados da ONG salvos com sucesso!");



        window.location.href = "TelaPrincipalGestorOng.html";



    } catch (erro) {


        console.error("Erro:", erro);


        alert("Erro inesperado. Veja o console.");

    }


}