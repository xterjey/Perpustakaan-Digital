<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\UlasanBuku;

class UlasanBukuController extends Controller
{
    public function show($bukuId)
    {
        $ulasanBuku = UlasanBuku::with('buku', 'user')->where('BukuID', $bukuId)->get();

        return response()->json($ulasanBuku, 200);
    }

    public function destroy($id)
    {
        $ulasanBuku = UlasanBuku::find($id);

        if (!$ulasanBuku) {
            return response()->json(['message' => 'Ulasan buku tidak ditemukan'], 404);
        }

        $ulasanBuku->delete();

        return response()->json(['message' => 'Ulasan buku berhasil dihapus'], 200);
    }

    public function countRating($bukuId)
    {
        $ulasanData = UlasanBuku::where('BukuID', $bukuId)
                            ->selectRaw('COUNT(*) as total_ulasan, AVG(Rating) as average_rating')
                            ->first();

        $totalUlasan = $ulasanData->total_ulasan;
        $averageRating = $ulasanData->average_rating ?? 0.0;

        return response()->json([
            'average_rating' => $averageRating,
            'total_ulasan' => $totalUlasan
        ], 200);
    }

    public function updateUserReview(Request $request, $userId, $bukuId)
    {
        $request->validate([
            'Ulasan' => 'required|string',
            'Rating' => 'required|numeric|min:1|max:5'
        ]);
        $peminjaman = Peminjaman::where('UsersID', $userId)
                                 ->where('BukuID', $bukuId)
                                 ->first();
        $ulasan = UlasanBuku::updateOrCreate(
            ['UsersID' => $userId, 'BukuID' => $bukuId],
            ['Ulasan' => $request->input('Ulasan'), 'Rating' => $request->input('Rating')]
        );

        return response()->json([
            'success' => true,
            'data' => $ulasan,
        ]);
    }

}
