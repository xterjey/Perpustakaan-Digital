<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UlasanBuku extends Model
{
    protected $table = 'ulasanbuku';
    protected $primaryKey = 'UlasanID';

    protected $fillable = [
        'UsersID', 'BukuID', 'Ulasan', 'Rating',
    ];

    // Relasi Tabel
    public function user()
    {
        return $this->belongsTo(User::class, 'UsersID', 'UserID');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'BukuID', 'BukuID');
    }

    // End
}
