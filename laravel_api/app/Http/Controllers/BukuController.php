<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use Illuminate\Http\Request;
use App\Models\Buku;

class BukuController extends Controller
{
    public function index()
    {
        $bukus = Buku::with('kategoribuku')->get();
        return response()->json($bukus, 200);
    }

    public function show($id)
    {
        $buku = Buku::with('kategoribuku')->find($id);

        if (!$buku) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json(['buku' => $buku], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'Judul' => 'required|string',
            'Penulis' => 'required|string',
            'Penerbit' => 'required|string',
            'TahunTerbit' => 'required|integer',
            'deskripsi' => 'string|nullable',
            'imageurl' => 'string|nullable|url|imageurl',
            'kategoribuku_id' => 'required|array',
            'kategoribuku_id.*' => 'exists:kategoribuku,KategoriID',
            'stok' => 'required|integer|min:0',
        ]);

        $randomISBN = $this->generateRandomISBN();

        $buku = Buku::create(array_merge($request->all(), ['ISBN' => $randomISBN]));

        $buku->stok = $request->input('stok');
        $buku->save();

        $buku->kategoribuku()->attach($request->input('kategoribuku_id', []));

        return response()->json(['buku' => $buku], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'Judul' => 'string',
            'Penulis' => 'string',
            'Penerbit' => 'string',
            'TahunTerbit' => 'integer',
            'deskripsi' => 'string|nullable',
            'imageurl' => 'string|nullable|url|imageurl',
            'kategoribuku_id' => 'array',
            'kategoribuku_id.*' => 'exists:kategoribuku,KategoriID',
            'stok' => 'integer|min:0',
        ]);

        $buku = Buku::find($id);
        if (!$buku) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $buku->update($request->all());

        $buku->stok = $request->input('stok');
        $buku->save();

        $buku->kategoribuku()->sync($request->input('kategoribuku_id', []));

        return response()->json(['buku' => $buku], 200);
    }

    public function destroy($bukuId)
    {
        $buku = Buku::find($bukuId);

        if (!$buku) {
            return response()->json(['error' => 'Buku not found'], 404);
        }

        $buku->delete();

        return response()->json(null, 204);
    }

    private function generateRandomISBN()
    {
        $randomISBN = '978';

        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomText = '';
        for ($i = 0; $i < 3; $i++) {
            $randomText .= $characters[rand(0, strlen($characters) - 1)];
        }
        $randomISBN .= $randomText;

        for ($i = 0; $i < 3; $i++) {
            $randomISBN .= mt_rand(0, 9);
        }

        return $randomISBN;
    }
}
