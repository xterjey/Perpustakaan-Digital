<?php

// app/Models/KoleksiPribadi.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KoleksiPribadi extends Model
{
    use HasFactory;

    protected $table = 'koleksipribadi';
    protected $primaryKey = 'KoleksiID';

    protected $fillable = [
        'UsersID',
        'BukuID',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'UsersID', 'UserID');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'BukuID', 'BukuID');
    }
}
