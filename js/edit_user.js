
function userView() {
    // Dapatkan nilai parameter 'username' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const usernameInput = urlParams.get('username');
    const namaInput = urlParams.get('nama');
    const levelInput = urlParams.get('level');


    // Tampilkan nilai parameter 'username' pada elemen input dengan ID 'inputUsername'
    document.getElementById('inputUsername').value = usernameInput;
    document.getElementById('inputNama').value = namaInput;
    document.getElementById('inputLevel').value = levelInput;
  }

  // Panggil fungsi userView setelah elemen input dibuat dalam markup HTML
  userView();


// Panggil fungsi showUsernameAndPassword saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
    showUsernameAndPassword();
  });

// <!-- script mengambil value -->
function showUsernameAndPassword() {
    // Ambil username dan password dari localStorage
    var nama = localStorage.getItem("nama");
    
    // Tampilkan username dan password sebagai label
    document.getElementById("namaLabel").textContent = nama;

}

// <!-- script autentikasi -->
function checkAuthentication() {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }
}
checkAuthentication();

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

function showModal() {
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Data User Akan Diubah!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008431',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            ubahData();
        }
    });
  }

function ubahData() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");
    
    const apiUrl = 'http://localhost:5007/?action=loginubah&user=?&passuser=?&init=?&nama=?&level=?';
  
    // Ambil data dari input form
    const init = document.getElementById('inputUsername').value;
    const nama = document.getElementById('inputNama').value;
    const level = document.getElementById('inputLevel').value;
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
        .replace('user=?', 'user=' + user)
        .replace('passuser=?', 'passuser=' + passuser)
        .replace('init=?', 'init=' + init)
        .replace('nama=?', 'nama=' + nama)
        .replace('level=?', 'level=' + level);
  
    // Kirim permintaan ke API menggunakan metode fetch
    fetch(apiUrlWithParams)
    .then(response => response.json())
    .then(data => {
        if (data.status === 0) {
            Swal.fire(
                'Success!',
                'Data berhasil diubah.',
                'success'
            );
        } else if (data.status === 1 && data.msg === "User Tidak Ditemukan") {
            Swal.fire(
                'Error!',
                'User Tidak Ditemukan.',
                'error'
            );
        } else {
            Swal.fire(
                'Error!',
                'Terjadi kesalahan saat mengubah data.',
                'error'
            );
        }
    })
    .catch(error => {
        Swal.fire(
            'Error!',
            'Terjadi kesalahan saat mengubah data.',
            'error'
        );
    });
  }


