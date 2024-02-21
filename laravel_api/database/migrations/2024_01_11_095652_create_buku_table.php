<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBukuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->id('BukuID');
            $table->string('Judul');
            $table->string('Penulis');
            $table->string('Penerbit');
            $table->integer('TahunTerbit');
            $table->string('ISBN')->unique(); 
            $table->text('deskripsi');
            $table->string('imageurl')->nullable();
            $table->integer('stok')->default(0); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buku');
    }
}
