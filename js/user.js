
// <!-- script autentikasi -->
function checkAuthentication() {
    var token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "login.html";
    }
  }
  checkAuthentication();
  
  // Panggil fungsi showUsernameAndPassword saat halaman selesai dimuat
  document.addEventListener("DOMContentLoaded", function () {
      showUsernameAndPassword();
    });
  
  // <!-- script mengambil value -->
  function showUsernameAndPassword() {
    // Ambil username dan password dari localStorage
    var nama = localStorage.getItem("nama");
  
    // Tampilkan username dan password sebagai label
    document.getElementById("namaLabel").textContent = nama;
  }

  function showLogout() {
    Swal.fire({
      title: 'Apakah anda yakin untuk logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: '#003d79',
      cancelButtonText: 'Batal'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logout();
      } else if (result.isCanceled) {
        Swal.fire('Logout dibatalkan', '', 'info')
      }
    })
  }
  
//   <!-- script logout -->
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("nama");
  localStorage.removeItem("level");
  window.location.href = "login.html";
}
//   <!-- End of javascript Logout-->

   // Fungsi untuk mengambil data dari API dan memperbarui tabel di halaman HTML
   async function getDataFromAPI() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");

    const apiUrl = `http://localhost:5007/?action=loginlist&user=ris&passuser=man`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Panggil fungsi untuk memperbarui tabel dengan data yang diperoleh
        const table = document.getElementById('user tbody');

        // Bersihkan isi tabel sebelum memperbarui dengan data baru
        table.innerHTML = '';

    // Tambahkan baris data ke tabel
    data.data.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.username}</td>
        <td>${item.level}</td>
        <td>
          <div class="p-2 bd-highlight">
            <a class="btn btn-success"><i class="bi bi-pencil-square"></i> Edit</a>
          </div>
        </td>
      `;
      table.appendChild(row);

     // Tambahkan event listener pada tabel
table.addEventListener('click', function(event) {
  // Periksa apakah tombol "success" yang diklik
  if (event.target.classList.contains('btn-success')) {
    // Dapatkan username, nama, dan level dari baris tabel terkait
    const row = event.target.closest('tr');
    const username = row.querySelector('td:nth-child(3)').innerText;
    const nama = row.querySelector('td:nth-child(2)').innerText;
    const level = row.querySelector('td:nth-child(4)').innerText;

    // Redirect ke halaman edit user dengan mengambil data berdasarkan username, nama, dan level
    const url = `edit_user.html?username=${username}&nama=${nama}&level=${level}`;
    window.location.href = url;
  }
});
    });
// <!-- script to add button export and show length -->
    $("#user").DataTable({
      searching: true,
      info: true,
      paging: true,
      dom: "lftrip",
      buttons: ["excel", "pdf"],
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
    });
    } catch (error) {
        Swal.fire(
          'Error!',
          'Terjadi kesalahan.',
          'error'
      );
    }
}

// Panggil fungsi untuk mendapatkan data dari API saat halaman dimuat
window.onload = getDataFromAPI;

