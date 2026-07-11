const API_SALVAR_ONG = "http://192.168.10.22:8014/ong/salvar";
const API_SALVAR_GESTOR = "http://192.168.10.22:8014/gestor/salvar";


function salvarEtapaUm() {
//função que pega todos os dados do formulario na primeira etapa e gua em LocalStorage.set em Json.
	const dadosOng = {
		nomeFantasia: document.getElementById('nomeFantasia').value,
		cnpj: document.getElementById('cnpj').value,
		areaAtuacao: document.getElementById('areaAtuacao').value,
		emailOng: document.getElementById('emailOng').value,
		descricao: document.querySelector("textarea").value
	};

	if (
		//validações se é vazio e com operador "ou"
		dadosOng.nomeFantasia === "" ||
		dadosOng.cnpj === "" ||
		dadosOng.areaAtuacao === "" ||
		dadosOng.emailOng === ""
	) {
		alert("Preencha todos os campos obrigatórios!");
	}
	else {
		localStorage.setItem("dadosOng", JSON.stringify(dadosOng));
		window.location.href = "TelaCadastroOngEtapaDois.html";
	}
}

//Tonim, esta função irá fazer duas chamadas(1 pra ong e 1 pra gestor) de apis para salvar o dados do gestor, esta função pega o dados salvos na etapa 1.

	async function cadastroDeOng() {
		const dadosSalvos = JSON.parse(localStorage.getItem("dadosOng"));
	
		if (dadosSalvos === null) {
			alert("Dados da etapa 1 não encontrados!");
			window.location.href = "TelaCadastroOngEtapaUm.html";
			return;
		} else {
			const cadastroOng = {
				nomeFantasia: dadosSalvos.nomeFantasia,
				cnpj: dadosSalvos.cnpj,
				areaAtuacao: dadosSalvos.areaAtuacao,
				emailOng: dadosSalvos.emailOng,
				descricao: dadosSalvos.descricao,
				nomeGestor: document.getElementById('nomeGestor').value,
				cpfGestor: document.getElementById('cpfGestor').value,
				cargoGestor: document.getElementById('cargoGestor').value,
				emailGestor: document.getElementById('emailGestor').value,
				telefoneGestor: document.getElementById('telefoneGestor').value,
				senhaOng: document.getElementById('senhaOng').value
	
			};
			//aqui fa validações.
			if (cadastroOng.senhaOng.trim() === "") {
				alert("Informe uma senha.");
				return;
			}
			if (validaCNPJ(cadastroOng.cnpj) == false) {
				alert("CNPJ inválido!");
				return;
			} else if (validaCpfOng(cadastroOng.cpfGestor) == false) {
	
				alert("CPF inválido!");
				return;
			}
			console.log(JSON.stringify({
			    nomeFantasia: cadastroOng.nomeFantasia,
			    cnpj: cadastroOng.cnpj,
			    areaAtuacao: cadastroOng.areaAtuacao,
			    emailOng: cadastroOng.emailOng,
			    descricao: cadastroOng.descricao,
			    senhaOng: cadastroOng.senhaOng
			}, null, 2));
			const response = await fetch(API_SALVAR_ONG, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					nomeFantasia: cadastroOng.nomeFantasia,
					cnpj: cadastroOng.cnpj,
					areaAtuacao: cadastroOng.areaAtuacao,
					emailOng: cadastroOng.emailOng,
					descricao: cadastroOng.descricao,
					senhaOng: cadastroOng.senhaOng
				})
			});
	
			if (response.ok) {
				const ongSalva = await response.json();
	
				const gestor = {
					nomeGestor: cadastroOng.nomeGestor,
					cpf: cadastroOng.cpfGestor,
					emailGestor: cadastroOng.emailGestor,
					telefone: cadastroOng.telefoneGestor,
					cargoGestor: cadastroOng.cargoGestor,
					ong: {
						id: ongSalva.id
					}
	
				};
	
				const responseGestor = await fetch(API_SALVAR_GESTOR, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(gestor)
				});
	
				if (responseGestor.ok) {
					alert("ONG cadastrada com sucesso!");
					localStorage.removeItem("dadosOng");
					window.location.href = "TelaEntrar.html";
				}
			}
	
		}
	
	}
	function validaCpfOng(cpf) {

		cpf = cpf.replace(/[^\d]/g, '');

		if (cpf.length != 11) {
			return false;
		}
		if (
			cpf == "00000000000" ||
			cpf == "11111111111" ||
			cpf == "22222222222" ||
			cpf == "33333333333" ||
			cpf == "44444444444" ||
			cpf == "55555555555" ||
			cpf == "66666666666" ||
			cpf == "77777777777" ||
			cpf == "88888888888" ||
			cpf == "99999999999"
		) {
			return false;
		}

		let soma = 0;
		let resto;

		for (let i = 1; i <= 9; i++) {
			soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}

		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) {
			resto = 0;
		}

		if (resto != parseInt(cpf.substring(9, 10))) {
			return false;
		}

		soma = 0;

		for (let i = 1; i <= 10; i++) {
			soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}

		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) {
			resto = 0;
		}

		if (resto != parseInt(cpf.substring(10, 11))) {
			return false;
		}

		return true;
	}

	function validaCNPJ(cnpj) {

		cnpj = cnpj.replace(/[^\d]+/g, '');

		if (cnpj.length != 14) {
			return false;
		}

		if (
			cnpj == "00000000000000" ||
			cnpj == "11111111111111" ||
			cnpj == "22222222222222" ||
			cnpj == "33333333333333" ||
			cnpj == "44444444444444" ||
			cnpj == "55555555555555" ||
			cnpj == "66666666666666" ||
			cnpj == "77777777777777" ||
			cnpj == "88888888888888" ||
			cnpj == "99999999999999"
		) {
			return false;
		}

		let tamanho = 12;
		let numeros = cnpj.substring(0, tamanho);
		let digitos = cnpj.substring(tamanho);

		let soma = 0;
		let pos = 5;

		for (let i = 0; i < tamanho; i++) {

			soma += numeros[i] * pos--;
			if (pos < 2) {
				pos = 9;
			}
		}

		let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

		if (resultado != digitos[0]) {
			return false;
		}
		tamanho = 13;
		numeros = cnpj.substring(0, tamanho);

		soma = 0;
		pos = 6;

		for (let i = 0; i < tamanho; i++) {
			soma += numeros[i] * pos--;
			if (pos < 2) {
				pos = 9;
			}
		}

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

		if (resultado != digitos[1]) {
			return false;
		}
		return true;
	}
