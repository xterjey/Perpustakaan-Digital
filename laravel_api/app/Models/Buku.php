<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $table = 'buku';
    protected $primaryKey = 'BukuID';

    protected $fillable = [
        'KategoriID',
        'Judul',
        'Penulis',
        'Penerbit',
        'TahunTerbit',
        'ISBN',
        'deskripsi',
        'imageurl',
        'stok', 
    ];

    public function kategoribuku()
    {
        return $this->belongsToMany(KategoriBuku::class, 'buku_kategori', 'BukuID', 'KategoriID');
    }
    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'BukuID', 'BukuID');
    }

    public function koleksipribadi()
    {
        return $this->hasMany(KoleksiPribadi::class, 'BukuID', 'BukuID');
    }

    public function ulasanbuku()
    {
        return $this->hasMany(UlasanBuku::class, 'BukuID', 'BukuID');
    }
}
