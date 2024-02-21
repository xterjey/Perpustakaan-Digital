<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'UserID';

    protected $fillable = [
        'username', 'password', 'email', 'NamaLengkap', 'Alamat', 'role', 'email_verified', 'verification_token', 'status'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
    ];

    public function getEmailForVerification()
    {
        return $this->email;
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\EmailVerification);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function koleksiPribadi()
    {
        return $this->hasMany(KoleksiPribadi::class, 'UsersID', 'UserID');
    }

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'UsersID', 'UserID');
    }

    public function ulasanBuku()
    {
        return $this->hasMany(UlasanBuku::class, 'UsersID', 'UserID');
    }
}
