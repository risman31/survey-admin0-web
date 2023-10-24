document.addEventListener("DOMContentLoaded", function () {
  showUsernameAndPassword();
  detailSurvey();
});

function showUsernameAndPassword() {
  var nama = localStorage.getItem("nama");

  document.getElementById("namaLabel").textContent = nama;
}

function checkAuthentication() {
  var token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}
checkAuthentication();

async function detailSurvey() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");

  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=surveydetail&user=${user}&passuser=${passuser}&ktp=${ktp}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    document.getElementById("Surveynama").value = data.nama;
    document.getElementById("Surveyalamat").value = data.alamat;
    SurveyKecamatan = data.id_kecamatan;
    SurveyKelurahan = data.id_kelurahan;

    const apiKec = `http://localhost:5007/?action=kecamatanlist&user=${user}&passuser=${passuser}`;
    const responseKec = await fetch(apiKec);
    const dataKec = await responseKec.json();
    if (dataKec.status === 0) {
      const kecamatanSelect = document.getElementById("Surveykecamatan");
      dataKec.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.kecamatan;
        if (item.id === SurveyKecamatan) {
          option.selected = true;
          kecamatanSelect.addEventListener("change", getKelurahan);
        }
        kecamatanSelect.appendChild(option);
      });
      getKelurahan();
    }

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
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Terjadi kesalahan",
      icon: "error",
      confirmButtonText: "Close",
    });
  }
}

async function getKelurahan() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");

  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;

  const apiUrl = `http://localhost:5007/?action=surveydetail&user=${user}&passuser=${passuser}&ktp=${ktp}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // SurveyKecamatan = data.id_kecamatan;
    SurveyKelurahan = data.id_kelurahan;

    const SurveyKecamatan = document.getElementById("Surveykecamatan").value;
    // const SurveyKelurahan = document.getElementById("Surveykelurahan").value;
  
    const apiKel = `http://localhost:5007/?action=kelurahanlist&user=${user}&passuser=${passuser}&idcamat=${SurveyKecamatan}`;
    fetch(apiKel)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          const kelurahanSelect = document.getElementById("Surveykelurahan");
          kelurahanSelect.innerHTML = ""; // Clear existing options
          data.data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id;
            option.text = item.kelurahan;
            if (item.id === SurveyKelurahan) {
              option.selected = true;
            }
            kelurahanSelect.appendChild(option);
          });
        }
      });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Terjadi kesalahan",
      icon: "error",
      confirmButtonText: "Close",
    });
  }
}


function backDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const ktp = urlParams.get("ktp");
  document.getElementById("inputKtp").value = ktp;
  const ktpParams = new URLSearchParams(window.location.search);
  ktpParams.set("ktp", ktp);
  window.location.href = "detail.html?" + ktpParams.toString();
}

function showLogout() {
  Swal.fire({
    title: "Apakah anda yakin untuk logout?",
    showCancelButton: true,
    confirmButtonText: "Logout",
    confirmButtonColor: "#003d79",
    cancelButtonText: "Batal",
  }).then((result) => {
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

function showModal() {
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Anda Tidak Akan Dapat Mengembalikan Data Sebelumnya!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#008431",
    cancelButtonColor: "#d33",
    confirmButtonText: "Update",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      ubahSurvey();
    }
  });
}

async function ubahSurvey() {
  var user = localStorage.getItem("username");
  var passuser = localStorage.getItem("password");
  var ktpinput = document.getElementById("inputKtp").value;
  var nama = document.getElementById("Surveynama").value;
  var alamat = document.getElementById("Surveyalamat").value;
  var kecamatan = document.getElementById("Surveykecamatan").value;
  var kelurahan = document.getElementById("Surveykelurahan").value;
  var rt = document.getElementById("Surveyrt").value;
  var rw = document.getElementById("Surveyrw").value;
  var nohp = document.getElementById("Surveyhandphone").value;
  var penghuni = document.getElementById("Surveypenghuni").value;
  var daya = document.getElementById("Surveydaya").value;
  var usaha = document.getElementById("Surveyusaha").value;
  var jaringan = document.getElementById("Surveyjaringan").value;
  var jarak = document.getElementById("Surveyjarak").value;
  var lokasi = document.getElementById("Surveylokasi").value;
  var luasbangunan = document.getElementById("Surveyluasbangunan").value;
  var nometer = document.getElementById("Surveynometer").value;
  var keterangan = document.getElementById("Surveyketerangan").value;

  var apiUrl =
    "http://localhost:5007/?action=surveyubah" +
    "&user=" +
    user +
    "&passuser=" +
    passuser +
    "&ktp=" +
    ktpinput +
    "&nama=" +
    nama +
    "&alamat=" +
    alamat +
    "&kecamatan=" +
    kecamatan +
    "&kelurahan=" +
    kelurahan +
    "&rt=" +
    rt +
    "&rw=" +
    rw +
    "&nohp=" +
    nohp +
    "&penghuni=" +
    penghuni +
    "&daya=" +
    daya +
    "&usaha=" +
    usaha +
    "&jaringan=" +
    jaringan +
    "&jarak=" +
    jarak +
    "&lokasi=" +
    lokasi +
    "&luasbangunan=" +
    luasbangunan +
    "&nometer=" +
    nometer +
    "&keterangan=" +
    keterangan;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 0) {
      Swal.fire("Success!", "Data berhasil diubah.", "success");
    } else {
      Swal.fire("Error!", "Terjadi kesalahan saat mengubah data.", "error");
    }
  } catch (error) {
    Swal.fire("Error!", "Terjadi kesalahan saat mengubah data.", "error");
  }
}
