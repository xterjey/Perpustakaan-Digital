<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKoleksipribadiTable extends Migration
{
    public function up()
    {
        Schema::create('koleksipribadi', function (Blueprint $table) {
            $table->id('KoleksiID');
            $table->foreignId('UsersID')->constrained('users', 'UserID')->onDelete('cascade');
            $table->foreignId('BukuID')->constrained('buku', 'BukuID')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('koleksipribadi');
    }
}
