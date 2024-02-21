<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Success</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="alert alert-success" role="alert">
            Email berhasil terverifikasi. Anda akan dialihkan ke halaman login dalam beberapa detik.
        </div>
        <div id="timer">Redirect dalam: <span id="countdown">3</span> detik</div>
    </div>

    <script>
        // Set waktu awal
        var seconds = 3;

        // Tampilkan timer
        var countdown = setInterval(function() {
            seconds--;
            document.getElementById("countdown").textContent = seconds;

            // Redirect setelah hitung mundur selesai
            if (seconds <= 0) {
                clearInterval(countdown);
                window.location.href = 'https://jayourbae.biz.id/login';
            }
        }, 1000);
    </script>
</body>
</html>
