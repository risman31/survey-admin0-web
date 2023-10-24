
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
  var nama = localStorage.getItem("nama");
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

function sendData() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");
  
  const apiUrl = 'http://localhost:5007/?action=loginsimpan&user=?&passuser=?&init=?&nama=?&password=?&level=?';

  // Ambil data dari input form
  const init = document.getElementById('init').value;
  const nama = document.getElementById('nama').value;
  const password = document.getElementById('password').value;
  const level = document.getElementById('level').value;

   // Periksa jika ada input yang kosong
   if (init === '' || nama === '' || password === '' || level === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Data tidak boleh kosong!'
    })
    return;
  }

  // Ganti placeholder di URL API dengan nilai yang diambil dari input form
  const apiUrlWithParams = apiUrl
      .replace('user=?', 'user=' + user)
      .replace('passuser=?', 'passuser=' + passuser)
      .replace('init=?', 'init=' + init)
      .replace('nama=?', 'nama=' + nama)
      .replace('password=?', 'password=' + password)
      .replace('level=?', 'level=' + level);

  // Kirim permintaan ke API menggunakan metode fetch
  fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => {
          // Handle respon dari API di sini
          if (data.status === 0) {
            Swal.fire(
              'Success!',
              'Data berhasil disimpan.',
              'success'
          );
            resetForm();
          } else if (data.status === 1) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Data user sudah ada!'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ada yang salah. Data gagal disimpan!'
            })
          }
          resetForm();
      })
      .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ada yang salah. Data gagal disimpan!'
          })
      });
}

function resetForm() {
  document.getElementById('init').value = '';
  document.getElementById('nama').value = '';
  document.getElementById('password').value = '';
  document.getElementById('level').value = '';
}

