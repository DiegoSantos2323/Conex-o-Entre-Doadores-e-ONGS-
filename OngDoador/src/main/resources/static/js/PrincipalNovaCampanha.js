console.log("NovaCampanha.js carregou");


document.addEventListener("DOMContentLoaded", function(){


    const botaoSalvar = document.getElementById("btnSalvarCampanha");


    if(botaoSalvar){


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


            };


            console.log("Campanha criada:");
            console.log(campanha);



            // salva no navegador
            localStorage.setItem(
                "campanha",
                JSON.stringify(campanha)
            );



            alert("Campanha criada com sucesso!");



            // vai para tela principal
            window.location.href = "TelaCampanhasPrincipal.html";


        });


    }


});