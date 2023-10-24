// Panggil fungsi showUsernameAndPassword saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  showUsernameAndPassword();
});

// <!-- script mengambil value -->
function showUsernameAndPassword() {
  var nama = localStorage.getItem("nama");

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

function detailSurvey() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");

  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=surveydetail&user=${user}&passuser=${passuser}&ktp=${ktp}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan respons JSON dari API
      document.getElementById("Surveynama").value = data.nama;
      document.getElementById("Surveyalamat").value = data.alamat;
      document.getElementById("Surveykecamatan").value = data.kecamatan;
      document.getElementById("Surveykelurahan").value = data.kelurahan;
      document.getElementById("Surveyrt").value = data.rt;
      document.getElementById("Surveyrw").value = data.rw;
      document.getElementById("Surveyhandphone").value = data.handphone;
      document.getElementById("Surveypenghuni").value = data.penghuni;
      document.getElementById("Surveydaya").value = data.daya;
      document.getElementById("Surveyusaha").value = data.usaha;
      document.getElementById("Surveyjaringan").value = data.jaringan;
      document.getElementById("Surveyjarak").value = data.jarak;
      document.getElementById("Surveyluasbangunan").value = data.luasbangunan;
      document.getElementById("Surveynometer").value = data.nometer;
      document.getElementById("Surveyketerangan").value = data.keterangan;
      document.getElementById("Surveylokasi").value = data.lokasi;
      document.getElementById("Surveytanggal").value = data.tanggal;
    })
    .catch((error) => {
      // console.error("Terjadi kesalahan:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    });
}
detailSurvey();

  // Dapatkan elemen input berdasarkan ID
  var input = document.getElementById("Surveyhandphone");
  // Tetapkan nilai dengan awalan "+62"
  input.value = "+62 " + input.value;

function bukaPhotoKtp() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");
  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=tampilfoto&user=${user}&passuser=${passuser}&ktp=${ktp}&jenis=KTP`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan respons JSON dari API
      if (data.status === 0 && data.data) {
        // Tampilkan gambar di HTML
        var gambarKtp = document.getElementById("gambarKtp");
        gambarKtp.innerHTML = `<img src="${data.data}" class="gambar" alt="Gambar KTP">`;
        
        // Setel gambar untuk ditampilkan di modal saat diklik
      var modalKtp = document.getElementById("modalKtp");
      modalKtp.src = data.data;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Gagal memuat gambar dari API.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    });
}

// Fungsi untuk membuka modal
function bukaModalKtp() {
  var modal = document.getElementById("modalGambarKtp");
  modal.style.display = "block";
}

// Fungsi untuk melakukan zoom pada gambar saat diklik
function zoomInKtp() {
  var modalKtp = document.getElementById("modalKtp");
  modalKtp.classList.toggle("zoomed");
}

// Fungsi untuk menutup modal
function tutupModalKtp() {
  var modal = document.getElementById("modalGambarKtp");
  modal.style.display = "none";
}

function bukaPhotoKk() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");
  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=tampilfoto&user=${user}&passuser=${passuser}&ktp=${ktp}&jenis=KK`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan respons JSON dari API
      if (data.status === 0 && data.data) {
        // Tampilkan gambar di HTML
        var gambarKk = document.getElementById("gambarKk");
        gambarKk.innerHTML = `<img src="${data.data}" class="gambar" alt="Gambar KK">`;

        // Setel gambar untuk ditampilkan di modal saat diklik
      var modalKk = document.getElementById("modalKk");
      modalKk.src = data.data;
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat gambar dari API.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  })
  .catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan',
      icon: 'error',
      confirmButtonText: 'Close'
    });
    });
}


// Fungsi untuk membuka modal
function bukaModalKk() {
  var modal = document.getElementById("modalGambarKk");
  modal.style.display = "block";
}

// Fungsi untuk melakukan zoom pada gambar saat diklik
function zoomInKk() {
  var modalKk = document.getElementById("modalKk");
  modalKk.classList.toggle("zoomed");
}

// Fungsi untuk menutup modal
function tutupModalKk() {
  var modal = document.getElementById("modalGambarKk");
  modal.style.display = "none";
}

function bukaPhotoRumah() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");

  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=tampilfoto&user=${user}&passuser=${passuser}&ktp=${ktp}&jenis=RUMAH`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan respons JSON dari API
      if (data.status === 0 && data.data) {
        // Tampilkan gambar di HTML
        var gambarRumah = document.getElementById("gambarRumah");
        gambarRumah.innerHTML = `<img src="${data.data}" class="gambar" alt="Gambar Rumah">`;

        // Setel gambar untuk ditampilkan di modal saat diklik
      var modalRumah = document.getElementById("modalRumah");
      modalRumah.src = data.data;
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat gambar dari API.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  })
  .catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan',
      icon: 'error',
      confirmButtonText: 'Close'
    });
    });
}


// Fungsi untuk membuka modal
function bukaModalRumah() {
  var modal = document.getElementById("modalGambarRumah");
  modal.style.display = "block";
}

// Fungsi untuk melakukan zoom pada gambar saat diklik
function zoomInRumah() {
  var modalRumah = document.getElementById("modalRumah");
  modalRumah.classList.toggle("zoomed");
}

// Fungsi untuk menutup modal
function tutupModalRumah() {
  var modal = document.getElementById("modalGambarRumah");
  modal.style.display = "none";
}

function bukaPhotoListrik() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");

  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=tampilfoto&user=${user}&passuser=${passuser}&ktp=${ktp}&jenis=LISTRIK`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan respons JSON dari API
      if (data.status === 0 && data.data) {
        // Tampilkan gambar di HTML
        var gambarListrik = document.getElementById("gambarListrik");
        gambarListrik.innerHTML = `<img src="${data.data}" class="gambar" alt="Gambar Meteran/No.Rek. Listrik">`;

        // Setel gambar untuk ditampilkan di modal saat diklik
      var modalListrik = document.getElementById("modalListrik");
      modalListrik.src = data.data;
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat gambar dari API.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  })
  .catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan',
      icon: 'error',
      confirmButtonText: 'Close'
    });
    });
}

// Fungsi untuk membuka modal
function bukaModalListrik() {
  var modal = document.getElementById("modalGambarListrik");
  modal.style.display = "block";
}

// Fungsi untuk melakukan zoom pada gambar saat diklik
function zoomInListrik() {
  var modalListrik = document.getElementById("modalListrik");
  modalListrik.classList.toggle("zoomed");
}

// Fungsi untuk menutup modal
function tutupModalListrik() {
  var modal = document.getElementById("modalGambarListrik");
  modal.style.display = "none";
}

function editSurvey() {
   // Ambil nilai KTP dari parameter URL
   const urlParams = new URLSearchParams(window.location.search);
   const ktp = urlParams.get("ktp");
   document.getElementById("inputKtp").value = ktp;

   // Simpan nilai KTP ke parameter URL
   const setParams = new URLSearchParams(window.location.search);
   setParams.set("ktp", ktp);
   
   // Redirect ke halaman detail survei dengan parameter URL
   window.location.href = "edit_survey.html?" + setParams.toString();
 
}

function upFoto() {
  // Ambil nilai KTP dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  // Simpan nilai KTP ke parameter URL
  const setParams = new URLSearchParams(window.location.search);
  setParams.set("ktp", ktp);
  
  // Redirect ke halaman detail survei dengan parameter URL
  window.location.href = "upfoto.html?" + setParams.toString();

}

function OpenMaps(event) {
  event.preventDefault(); // Menghentikan perilaku default dari tautan

  var surveyLokasi = document.getElementById("Surveylokasi").value;
  if (surveyLokasi) {
      var googleMapsLink = "https://www.google.com/maps/place/" + encodeURIComponent(surveyLokasi);
      window.open(googleMapsLink, '_blank');
  }
}

