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

// Fungsi Looping tahun dinamis
var select = document.getElementById("tahun");
var currentYear = new Date().getFullYear();

// Loop untuk menambahkan opsi tahun 2 tahun ke belakang
for (var i = currentYear - 2; i <= currentYear + 3; i++) {
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  select.appendChild(option);
}

// Jalankan fungsi bukaSurvey secara otomatis dengan bulan dan tahun saat ini
window.onload = function() {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1;
  var currentYear = currentDate.getFullYear();

  document.getElementById("bulan").value = currentMonth;
  document.getElementById("tahun").value = currentYear;

  bukaSurvey();
};

// Fungsi untuk mengambil data dari API dan memperbarui tabel di halaman HTML
async function bukaSurvey() {
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");

  var bulan = document.getElementById("bulan").value;
  var tahun = document.getElementById("tahun").value;

  const apiUrl = `http://localhost:5007/?action=surveylist&user=${username}&passuser=${password}&bulan=${bulan}&tahun=${tahun}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Periksa status respons
    if (data.status === 0) {
      // Bersihkan DataTable sebelum memperbarui dengan data baru
      const table = $("#survey").DataTable();
      table.clear().draw();

      // Panggil fungsi untuk memperbarui tabel dengan data yang diperoleh
      if (data.data.length > 0) {
        data.data.forEach((item, index) => {
          table.row
            .add([
              index + 1,
              item.ktp,
              item.nama,
              item.alamat,
              item.handphone,
              item.tanggal,
              item.penghuni,
              // item.daya,
              item.usaha,
              item.jaringan,
              item.jarak,
              item.lokasi,
            ])
            .draw();
        });

           // Tambahkan tombol Export PDF dan Excel
           new $.fn.dataTable.Buttons(table, {
            buttons: [
              {
                extend: "pdf",
                text: "Export PDF",
                exportOptions: {
                  columns: ":visible",
                },
              },
              {
                extend: "excel",
                text: "Export Excel",
                exportOptions: {
                  columns: ":visible",
                },
              },
            ],
          });
  
          // Tampilkan tombol pada halaman
          table.buttons().container().appendTo("#survey_wrapper .dataTables_filter").addClass("export-buttons");

        // Tambahkan event listener ke setiap baris tabel
        $("#survey tbody").on("click", "tr", function() {
          // Ambil nilai KTP dari kolom kedua (indeks 1)
          const ktp = table.row(this).data()[1];

          // Simpan nilai KTP ke parameter URL
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set("ktp", ktp);

          // Redirect ke halaman detail survei dengan parameter URL
          window.location.href = "detail.html?" + urlParams.toString();
        });
      } else {
        // Tampilkan pesan jika data kosong
        Swal.fire({
          title: "Info",
          text: "Tidak ada data untuk bulan dan tahun yang dipilih.",
          icon: "info",
          confirmButtonText: "Close",
        });
      }
    } else {
      // Survei tidak ditemukan, tampilkan pesan untuk pengguna
      Swal.fire({
        title: "Error!",
        text: "Survey Tidak Ditemukan",
        icon: "error",
        confirmButtonText: "Close",
      });

      const table = $("#survey").DataTable();

      // Bersihkan DataTable sebelum memperbarui dengan data baru
      table.clear().draw();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Terjadi kesalahan",
      icon: "error",
      confirmButtonText: "Close",
    });
  }
  // Panggil fungsi bukaSurvey saat bulan atau tahun dipilih ulang
document.getElementById("bulan").addEventListener("change", bukaSurvey);
document.getElementById("tahun").addEventListener("change", bukaSurvey);
}

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
