function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
      // Simpan username dan password ke localStorage
      localStorage.setItem("username", username);
    localStorage.setItem("password", password);

     // Validasi input kosong
     if (username === "" || password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: 'Username dan Password tidak boleh kosong.'
          })
        return;
    }

    $.ajax({
        url: "http://localhost:5007/?action=login&user=" + username + "&password=" + password,
        type: "POST",
        dataType: "json",
        headers: {
        },
        success: function(response) {
            var level = response.level;
            if (level === 0) {
                var nama = response.nama;
                var level = response.level;
                var token = response.token;

                localStorage.setItem("token", token);
                localStorage.setItem("nama", nama);
                localStorage.setItem("level", level);

                window.location.href = "survey.html";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login gagal!',
                    text: 'Periksa kembali username dan password Anda.'
                  })
            }
        },
        error: function(xhr, status, error) {
            // console.log(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan'
              })
        }
    });
    
}