<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Admin</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="alert alert-danger" role="alert">
            <strong>Terjadi Kesalahan!</strong>
            @isset($message)
                {{ $message }}
            @else
                Terjadi kesalahan saat melakukan verifikasi email. Silakan <a href="mailto:mailtoadmin@jayourbae.biz.id">hubungi admin</a>.
            @endisset
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Hubungi Admin</h5>
                <p class="card-text">Untuk pertanyaan atau bantuan lebih lanjut, silakan hubungi admin melalui email di bawah ini:</p>
                <a href="mailto:mailtoadmin@jayourbae.biz.id" class="btn btn-primary">Email Admin</a>
            </div>
        </div>
    </div>
</body>
</html>
