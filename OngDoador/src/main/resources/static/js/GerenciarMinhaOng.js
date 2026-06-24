
   /* ── Dropdown usuário ── */
   function toggleUserMenu() {
     document.getElementById('userDropdown').classList.toggle('open');
   }
   document.addEventListener('click', function(e) {
     const wrap = document.querySelector('.user-menu-wrap');
     if (wrap && !wrap.contains(e.target)) {
       document.getElementById('userDropdown').classList.remove('open');
     }
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
