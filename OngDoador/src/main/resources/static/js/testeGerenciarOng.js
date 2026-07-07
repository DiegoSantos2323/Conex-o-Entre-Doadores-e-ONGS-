
  /* ── Navbar ── */
  function toggleUserMenu() {
    document.getElementById('userDropdown').classList.toggle('open');
  }
  document.addEventListener('click', function(e) {
    const w = document.querySelector('.user-menu-wrap');
    if (w && !w.contains(e.target)) document.getElementById('userDropdown').classList.remove('open');
  });

  /* ── Preview da logo ── */
  function previewLogo(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('logoImg').src = ev.target.result;
      document.getElementById('logoPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  /* ── Máscara CEP ── */
  function mascaraCEP(input) {
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    input.value = v;
  }

  /* ── Busca CEP (ViaCEP) ── */
  function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const msg = document.getElementById('cepMsg');
    const btn = document.getElementById('btnBuscarCep');

    if (cep.length !== 8) {
      msg.textContent = 'Digite um CEP válido com 8 dígitos.';
      msg.className = 'field-msg erro';
      return;
    }

    btn.textContent = 'Buscando...';
    btn.disabled = true;
    msg.textContent = '';
    msg.className = 'field-msg';

    fetch('https://viacep.com.br/ws/' + cep + '/json/')
      .then(r => r.json())
      .then(data => {
        if (data.erro) {
          msg.textContent = 'CEP não encontrado.';
          msg.className = 'field-msg erro';
        } else {
          document.getElementById('street').value       = data.logradouro || '';
          document.getElementById('neighborhood').value = data.bairro     || '';
          document.getElementById('city').value         = data.localidade || '';
          const stateEl = document.getElementById('state');
          for (let i = 0; i < stateEl.options.length; i++) {
            if (stateEl.options[i].value === data.uf) { stateEl.selectedIndex = i; break; }
          }
          msg.textContent = '✓ ' + data.logradouro + ', ' + data.bairro + ' — ' + data.localidade + '/' + data.uf;
          msg.className = 'field-msg sucesso';
        }
      })
      .catch(() => {
        msg.textContent = 'Erro ao buscar CEP. Verifique sua conexão.';
        msg.className = 'field-msg erro';
      })
      .finally(() => {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg> Buscar';
        btn.disabled = false;
      });
  }
