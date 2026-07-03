const API_LISTAR_CAMPANHA_ID = "http://localhost:8000/campanha/listarporid";

async function carregarCampanha() {

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
      alert("Campanha não encontrada.");
      return;
    }
    const response = await fetch(`${API_LISTAR_CAMPANHA_ID}/${id}`);
	
    if (!response.ok) {
        alert("Erro ao carregar campanha.");
        return;
    }
    const campanha = await response.json();
    console.log(campanha);

}

window.onload = carregarCampanha;