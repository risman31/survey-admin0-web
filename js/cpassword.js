
// <!-- script mengambil value -->
function showUsernameAndPassword() {
    // Ambil username dan password dari localStorage
    var user = localStorage.getItem("username");
    var nama = localStorage.getItem("nama");
    
    // Tampilkan username dan password sebagai label
    document.getElementById("userNama").value = user;
    document.getElementById("namaLabel").textContent = nama;


}
showUsernameAndPassword();

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
    const apiUrl = 'http://localhost:5007/?action=logingantipass&user=?&passuser=?&password=?';
  
    // Ambil data dari input form
    const user = document.getElementById('userNama').value;
    const passuser = document.getElementById('userPass').value;
    const password = document.getElementById('newPass').value;

     // Periksa jika ada input yang kosong
   if (user === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Username tidak boleh kosong!'
    })
    return;
  } else if ( passuser === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Current Password tidak boleh kosong!'
    })
    return;
  } else if (password === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'New Password tidak boleh kosong!'
    })
    return;
  }
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
        .replace('user=?', 'user=' + user)
        .replace('passuser=?', 'passuser=' + passuser)
        .replace('password=?', 'password=' + password)
  
    // Kirim permintaan ke API menggunakan metode fetch
    fetch(apiUrlWithParams)
    .then(response => response.json())
    .then(data => {
        if (data.status === 0) {
            Swal.fire(
                'Success!',
                'Password berhasil diubah.',
                'success'
            );
            logout();
        } else if (data.status === 9 && data.msg === "Not Allowed") {
            Swal.fire(
                'Error!',
                'Current Password Salah',
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


