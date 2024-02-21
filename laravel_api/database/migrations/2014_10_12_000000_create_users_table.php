<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('UserID');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('Email')->unique()->nullable();
            $table->string('NamaLengkap');
            $table->string('Alamat');
            $table->enum('role', ['admin', 'petugas', 'peminjam'])->default('peminjam');
            $table->boolean('email_verified')->default(false);
            $table->string('verification_token')->nullable();
            $table->enum('status', ['active', 'registered', 'inactive'])->default('inactive');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
