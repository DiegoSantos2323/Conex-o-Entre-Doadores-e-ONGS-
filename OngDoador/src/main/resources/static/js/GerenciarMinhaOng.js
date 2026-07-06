const API_ATUALIZAR_ONG = "http://localhost:8000/ong/atualizar";

document.addEventListener("DOMContentLoaded", function () {

    const botaoSalvar = document.getElementById("btnSalvarOng");

    botaoSalvar.addEventListener("click", async function (event) {

        event.preventDefault();

        const ongLogada = JSON.parse(localStorage.getItem("usuarioLogado"));

        ongLogada.descricao = document.getElementById("summary").value;
        ongLogada.dataFundacao = document.getElementById("foundedAt").value;
        ongLogada.telefone = document.getElementById("phone").value;
        ongLogada.emailOng = document.getElementById("email").value;

        const response = await fetch(`${API_ATUALIZAR_ONG}/${ongLogada.id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(ongLogada)

        });

        if (response.ok) {

            const ongAtualizada = await response.json();
''
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(ongAtualizada)
            );

            alert("Dados da ONG atualizados com sucesso!");

            window.location.href = "TelaPrincipalGestorOng.html";

        } else {

            alert("Erro ao atualizar a ONG.");

        }

    });

});