<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Peminjaman;
use Faker\Factory as Faker;

class PeminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menggunakan Faker untuk mengisi data palsu
        $faker = Faker::create();

        // Loop untuk menambahkan beberapa data peminjaman palsu
        for ($i = 0; $i < 100; $i++) {
            // Membuat data peminjaman palsu
            Peminjaman::create([
                'UsersID' => $faker->numberBetween(1, 3),
                'BukuID' => $faker->numberBetween(1, 6), 
                'TanggalPeminjaman' => $faker->dateTimeBetween('-1 month', 'now'),
                'TanggalPengembalian' => $faker->dateTimeBetween('now', '+1 month'),
                'StatusPeminjaman' => $faker->randomElement(['PENDING', 'APPROVED', 'REJECTED', 'RETURNED'])
            ]);
        }
    }
}
