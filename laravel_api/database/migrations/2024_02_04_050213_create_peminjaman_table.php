<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeminjamanTable extends Migration
{
    public function up()
    {
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id('PeminjamanID');
            $table->foreignId('UsersID')->constrained('users', 'UserID');
            $table->foreignId('BukuID')->constrained('buku', 'BukuID');
            $table->date('TanggalPeminjaman');
            $table->date('TanggalPengembalian')->nullable();
            $table->enum('StatusPeminjaman', ['PENDING', 'APPROVED', 'REJECTED', 'RETURNED'])->default('PENDING');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('peminjaman');
    }
}
