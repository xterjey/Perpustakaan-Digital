<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KoleksiPribadi;

class KoleksiPribadiController extends Controller
{
    public function index($userId)
    {
        $koleksiPribadi = KoleksiPribadi::where('UsersID', $userId)->get();

        return response()->json(['data' => $koleksiPribadi], 200);
    }

    public function store(Request $request)
    {
        $existingCollection = KoleksiPribadi::where('UsersID', $request->UsersID)
                                             ->where('BukuID', $request->BukuID)
                                             ->first();

        if ($existingCollection) {
            return response()->json(['message' => 'Anda sudah memiliki koleksi untuk buku ini.'], 403);
        }

        $request->validate([
            'UsersID' => 'required|exists:users,UserID',
            'BukuID' => 'required|exists:buku,BukuID',
        ]);

        $koleksiPribadi = KoleksiPribadi::create($request->all());

        return response()->json($koleksiPribadi, 201);
    }

    public function destroy($id)
    {
        $koleksiPribadi = KoleksiPribadi::find($id);

        if (!$koleksiPribadi) {
            return response()->json(['message' => 'KoleksiPribadi not found'], 404);
        }

        $koleksiPribadi->delete();

        return response()->json(['message' => 'KoleksiPribadi deleted successfully'], 200);
    }
}
