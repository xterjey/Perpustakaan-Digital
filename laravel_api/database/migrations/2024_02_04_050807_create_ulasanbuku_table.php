<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUlasanbukuTable extends Migration
{
    public function up()
    {
        Schema::create('ulasanbuku', function (Blueprint $table) {
            $table->id('UlasanID');
            $table->foreignId('UsersID')->constrained('users', 'UserID');
            $table->foreignId('BukuID')->constrained('buku', 'BukuID');
            $table->text('Ulasan');
            $table->integer('Rating');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ulasanbuku');
    }
}
