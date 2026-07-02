const API_SALVAR_ONG = "http://localhost:8000/ong/salvar";


document.addEventListener("DOMContentLoaded", function(){


    const botaoSalvar = document.getElementById("btnSalvarOng");


    botaoSalvar.addEventListener("click", function(event){


        event.preventDefault();



        const ong = {


            descricao:
            document.getElementById("summary").value,


            dataFundacao:
            document.getElementById("foundedAt").value,


            telefone:
            document.getElementById("phone").value,


            emailOng:
            document.getElementById("email").value,


            rua:
            document.getElementById("street").value,


            numero:
            document.getElementById("number").value,


            bairro:
            document.getElementById("neighborhood").value,


            cidade:
            document.getElementById("city").value,


            estado:
            document.getElementById("state").value



        };



        console.log("Dados da ONG:");
        console.log(ong);



        fetch(API_SALVAR_ONG, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body: JSON.stringify(ong)


        })


        .then(resposta => resposta.json())


        .then(dados => {


            console.log("ONG salva no banco:");
            console.log(dados);


            alert("ONG cadastrada com sucesso!");

            window.location.href =
            "TelaPrincipalGestorOng.html";

        });

    });

});