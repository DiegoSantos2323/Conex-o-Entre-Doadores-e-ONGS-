
   function toggleUserMenu() {
     document.getElementById('userDropdown').classList.toggle('open');
   }
   document.addEventListener('click', function(e) {
     const wrap = document.querySelector('.user-menu-wrap');
     if (wrap && !wrap.contains(e.target)) {
       document.getElementById('userDropdown').classList.remove('open');
     }
   });
