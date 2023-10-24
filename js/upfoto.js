// Panggil fungsi showUsernameAndPassword saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    showUsernameAndPassword();
  });
  
  // <!-- script mengambil value -->
  function showUsernameAndPassword() {
    var nama = localStorage.getItem("nama");
  
    document.getElementById("namaLabel").textContent = nama;


    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");
    document.getElementById("idNik").value = ktp;

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

  function backDetail() {
    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");
  
    // Simpan nilai KTP ke parameter URL
    const ktpParams = new URLSearchParams(window.location.search);
    ktpParams.set("ktp", ktp);
  
    // Redirect ke halaman detail survei dengan parameter URL
    window.location.href = "detail.html?" + ktpParams.toString();
  }

  function upload() {
    submitPhotoKtp();
    submitPhotoKk();
    submitPhotoRumah();
    submitPhotoListrik();
  }

  function submitPhotoKtp() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");
  
    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");

    var jenisKtp = 'KTP';
  
    const apiUrl = 'http://localhost:5007/?action=simpanfoto&user=?&passuser=?&ktp=?&jenis=?&fileupload=?';
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
      .replace('user=?', 'user=' + user)
      .replace('passuser=?', 'passuser=' + passuser)
      .replace('ktp=?', 'ktp=' + ktp)
      .replace('jenis=?', 'jenis=' + jenisKtp);
  
    // Ambil file yang ingin diupload
    var fileKtp = document.getElementById('photoKtp');
    var file = fileKtp.files[0];
  
    // Buat objek FormData untuk mengirim data file
    var formData = new FormData();
    formData.append('fileupload', file);
  
    // Kirim data ke API menggunakan fetch
    fetch(apiUrlWithParams, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.status === 0) {
      //   Swal.fire(
      //     'Success!',
      //     'Photo Berhasil Diperbaharui.',
      //     'success'
      // );
      // Mengosongkan input file setelah berhasil diunggah
      fileKtp.value = '';
      // Menghilangkan tampilan gambar preview
      ktpPreview.src = '#';
      ktpPreview.style.display = 'none';
      } else {
        console.log("Gagal");
        Swal.fire(
          'Error!',
          'Terjadi kesalahan saat memperbaharui photo.',
          'error'
      );
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function previewKtp(event) {
    var fileKtp = event.target;
    var file = fileKtp.files[0];
    var ktpPreview = document.getElementById('ktpPreview');

    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        ktpPreview.src = reader.result;
        ktpPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      ktpPreview.src = '#';
      ktpPreview.style.display = 'none';
    }
  }

  function submitPhotoKk() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");
  
    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");

    var jenisKk = 'KK';
  
    const apiUrl = 'http://localhost:5007/?action=simpanfoto&user=?&passuser=?&ktp=?&jenis=?&fileupload=?';
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
      .replace('user=?', 'user=' + user)
      .replace('passuser=?', 'passuser=' + passuser)
      .replace('ktp=?', 'ktp=' + ktp)
      .replace('jenis=?', 'jenis=' + jenisKk);
  
    // Ambil file yang ingin diupload
    var fileKk = document.getElementById('photoKk');
    var file = fileKk.files[0];
  
    // Buat objek FormData untuk mengirim data file
    var formData = new FormData();
    formData.append('fileupload', file);
  
    // Kirim data ke API menggunakan fetch
    fetch(apiUrlWithParams, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.status === 0) {
      //   Swal.fire(
      //     'Success!',
      //     'Photo Berhasil Diperbaharui.',
      //     'success'
      // );
      // Mengosongkan input file setelah berhasil diunggah
      fileKk.value = '';
      // Menghilangkan tampilan gambar preview
      kkPreview.src = '#';
      kkPreview.style.display = 'none';
      } else {
        console.log("Gagal");
        Swal.fire(
          'Error!',
          'Terjadi kesalahan saat memperbaharui photo.',
          'error'
      );
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function previewKk(event) {
    var fileKk = event.target;
    var file = fileKk.files[0];
    var kkPreview = document.getElementById('kkPreview');

    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        kkPreview.src = reader.result;
        kkPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      kkPreview.src = '#';
      kkPreview.style.display = 'none';
    }
  }

  function submitPhotoRumah() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");
  
    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");

    var jenisRumah = 'RUMAH';
  
    const apiUrl = 'http://localhost:5007/?action=simpanfoto&user=?&passuser=?&ktp=?&jenis=?&fileupload=?';
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
      .replace('user=?', 'user=' + user)
      .replace('passuser=?', 'passuser=' + passuser)
      .replace('ktp=?', 'ktp=' + ktp)
      .replace('jenis=?', 'jenis=' + jenisRumah);
  
    // Ambil file yang ingin diupload
    var fileRumah = document.getElementById('photoRumah');
    var file = fileRumah.files[0];
  
    // Buat objek FormData untuk mengirim data file
    var formData = new FormData();
    formData.append('fileupload', file);
  
    // Kirim data ke API menggunakan fetch
    fetch(apiUrlWithParams, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.status === 0) {
      //   Swal.fire(
      //     'Success!',
      //     'Photo Berhasil Diperbaharui.',
      //     'success'
      // );
      // Mengosongkan input file setelah berhasil diunggah
      fileRumah.value = '';
      // Menghilangkan tampilan gambar preview
      rumahPreview.src = '#';
      rumahPreview.style.display = 'none';
      } else {
        console.log("Gagal");
        Swal.fire(
          'Error!',
          'Terjadi kesalahan saat memperbaharui photo.',
          'error'
      );
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function previewRumah(event) {
    var fileRumah = event.target;
    var file = fileRumah.files[0];
    var rumahPreview = document.getElementById('rumahPreview');

    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        rumahPreview.src = reader.result;
        rumahPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      rumahPreview.src = '#';
      rumahPreview.style.display = 'none';
    }
  }

  function submitPhotoListrik() {
    var user = localStorage.getItem("username");
    var passuser = localStorage.getItem("password");
  
    // Ambil nilai KTP dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const ktp = urlParams.get("ktp");

    var jenisListrik = 'LISTRIK';
  
    const apiUrl = 'http://localhost:5007/?action=simpanfoto&user=?&passuser=?&ktp=?&jenis=?&fileupload=?';
  
    // Ganti placeholder di URL API dengan nilai yang diambil dari input form
    const apiUrlWithParams = apiUrl
      .replace('user=?', 'user=' + user)
      .replace('passuser=?', 'passuser=' + passuser)
      .replace('ktp=?', 'ktp=' + ktp)
      .replace('jenis=?', 'jenis=' + jenisListrik);
  
    // Ambil file yang ingin diupload
    var fileListrik = document.getElementById('photoListrik');
    var file = fileListrik.files[0];
  
    // Buat objek FormData untuk mengirim data file
    var formData = new FormData();
    formData.append('fileupload', file);
  
    // Kirim data ke API menggunakan fetch
    fetch(apiUrlWithParams, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.status === 0) {
        Swal.fire(
          'Success!',
          'Photo Berhasil Diperbaharui.',
          'success'
      );
      // Mengosongkan input file setelah berhasil diunggah
      fileListrik.value = '';
      // Menghilangkan tampilan gambar preview
      listrikPreview.src = '#';
      listrikPreview.style.display = 'none';
      } else {
        console.log("Gagal");
        Swal.fire(
          'Error!',
          'Terjadi kesalahan saat memperbaharui photo.',
          'error'
      );
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function previewListrik(event) {
    var fileListrik = event.target;
    var file = fileListrik.files[0];
    var listrikPreview = document.getElementById('listrikPreview');

    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        listrikPreview.src = reader.result;
        listrikPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      listrikPreview.src = '#';
      listrikPreview.style.display = 'none';
    }
  }



 
  
  
  
  