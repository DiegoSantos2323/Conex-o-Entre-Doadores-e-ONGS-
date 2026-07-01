window.onload = function(){


    const botaoSalvar = document.getElementById("btnSalvarCampanha");


    botaoSalvar.addEventListener("click", function(event){


        event.preventDefault();


        const campanha = {


            nomeCampanha: document.getElementById("titulo").value,

            dataInicio: document.getElementById("startDate").value,

            dataFim: document.getElementById("endDate").value,

            status: document.getElementById("status").value,

            vidasImpactadas: document.getElementById("impactLives").value,

            descricao: document.getElementById("about").value,

            comDoacaoConseguimos: document.getElementById("impactDesc").value,

            arrecadado: document.getElementById("raised").value,

            metaMensal: document.getElementById("goal").value,

            progresso: document.getElementById("previaPerc").innerText.replace("%","")

        };



        console.log("Dados da campanha:");
        console.log(campanha);



        // salva temporariamente no navegador
        localStorage.setItem("campanha", JSON.stringify(campanha));



        fetch("http://localhost:8000/campanha/salvar", {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body: JSON.stringify(campanha)


        })


        .then(resposta => resposta.json())


        .then(dados => {


            console.log("Campanha salva no banco:");
            console.log(dados);


            alert("Campanha criada com sucesso!");



            // vai para tela principal das campanhas
            window.location.href = "TelaCampanhasPrincipal.html";



        })


        .catch(erro=>{


            console.log("Erro:");
            console.log(erro);


            alert("Erro ao salvar campanha");


        });



    });



};