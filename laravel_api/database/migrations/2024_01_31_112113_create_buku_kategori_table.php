<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBukuKategoriTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buku_kategori', function (Blueprint $table) {
            $table->unsignedBigInteger('BukuID');
            $table->unsignedBigInteger('KategoriID');
            $table->timestamps();
            $table->foreign('BukuID')->references('BukuID')->on('buku')->onDelete('cascade');
            $table->foreign('KategoriID')->references('KategoriID')->on('kategoribuku')->onDelete('cascade');
            $table->primary(['BukuID', 'KategoriID']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buku_kategori');
    }
}
