<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    protected $table = 'peminjaman';
    protected $primaryKey = 'PeminjamanID';

    protected $fillable = [
        'UsersID',
        'BukuID',
        'TanggalPeminjaman',
        'TanggalPengembalian',
        'StatusPeminjaman',
    ];

    // Relasi
    public function user()
    {
        return $this->belongsTo(User::class, 'UsersID', 'UserID');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'BukuID', 'BukuID');
    }
}
