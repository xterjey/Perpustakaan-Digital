<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategoriBuku;

class KategoriBukuController extends Controller
{

    public function index()
    {
        return response()->json(KategoriBuku::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'NamaKategori' => 'required|string',
        ]);

        return response()->json(KategoriBuku::create($request->all()), 201);
    }

    public function update(Request $request, $id)
    {
        $kategoriBuku = KategoriBuku::find($id);

        if (!$kategoriBuku) {
            return response()->json(['message' => 'Kategori Buku tidak ditemukan'], 404);
        }

        $request->validate([
            'NamaKategori' => 'required|string',
        ]);

        $kategoriBuku->update($request->all());

        return response()->json($kategoriBuku, 200);
    }
    public function destroy($id)
    {
        $kategoriBuku = KategoriBuku::find($id);

        if (!$kategoriBuku) {
            return response()->json(['message' => 'Kategori Buku tidak ditemukan'], 404);
        }

        $kategoriBuku->delete();

        return response()->json(['message' => 'Kategori Buku berhasil dihapus'], 200);
    }
}
