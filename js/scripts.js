/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// MEnampilkan value storage
document.addEventListener("DOMContentLoaded", function () {
    showUsernameAndPassword();
  });
  
  function showUsernameAndPassword() {
    var nama = localStorage.getItem("nama");
  
    document.getElementById("namaLabel").textContent = nama;
  }
  
  // script autentikasi
  
  function checkAuthentication() {
    var token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "login.html";
    }
  }
  checkAuthentication();

  function showLogout() {
    Swal.fire({
      title: "Apakah anda yakin untuk logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#003d79",
      cancelButtonText: "Batal",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logout();
      } else if (result.isCanceled) {
        Swal.fire("Logout dibatalkan", "", "info");
      }
    });
  }
  
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nama");
    localStorage.removeItem("level");
    window.location.href = "login.html";
  }
  
