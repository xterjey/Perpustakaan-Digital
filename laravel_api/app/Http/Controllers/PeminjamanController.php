<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Peminjaman;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PeminjamanApprovedNotification;
use App\Notifications\PeminjamanRejectedNotification;
use App\Notifications\PeminjamanReturnNotification;
use Illuminate\Support\Facades\DB;

class PeminjamanController extends Controller
{
    public function index()
    {
        $peminjamans = Peminjaman::with('user', 'buku')->get();
        return response()->json($peminjamans);
    }

    public function show($id)
    {
        $peminjaman = Peminjaman::with('user', 'buku')->find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], 404);
        }

        return response()->json($peminjaman);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'UsersID' => 'required|exists:users,UserID',
            'BukuID' => 'required|exists:buku,BukuID',
            'TanggalPeminjaman' => 'required|date',
            'TanggalPengembalian' => 'nullable|date',
            'StatusPeminjaman' => 'required|in:PENDING,APPROVED,REJECTED,RETURNED',
        ]);
    

        $buku = Buku::find($validatedData['BukuID']);
        if ($buku->stok <= 0) {
            return response()->json(['message' => 'Buku telah habis'], 422);
        }

        $peminjaman = Peminjaman::create($validatedData)->load('user', 'buku');
    
        return response()->json($peminjaman, 201);
    }
    

    public function destroy($id)
    {
        Peminjaman::destroy($id);
        return response()->json(null, 204);
    }

    public function userPeminjaman($userId)
    {
        $peminjamans = Peminjaman::with('user', 'buku')
            ->where('UsersID', $userId)
            ->get();

        return response()->json($peminjamans);
    }

    public function returnBuku($id)
    {
        $peminjaman = Peminjaman::find($id);
    
        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], 404);
        }
    
        $buku = $peminjaman->buku;
        $buku->increment('stok');
    
        $peminjaman->update(['StatusPeminjaman' => 'RETURNED']);
        if ($peminjaman->user->Email) {
            Notification::route('mail', $peminjaman->user->Email)
                ->notify(new PeminjamanReturnNotification($peminjaman));
        }
    
        return response()->json($peminjaman, 200);
    }
    
    public function approveBuku($id)
    {
        $peminjaman = Peminjaman::find($id);
    
        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], 404);
        }
    
        $buku = $peminjaman->buku;
    
        if ($buku->stok <= 0) {
            return response()->json(['message' => 'Stok buku habis'], 400);
        }
    
        $peminjaman->update([
            'StatusPeminjaman' => 'APPROVED',
            'TanggalPengembalian' => Carbon::now()->addDays(7) 
        ]);
    
        $buku->decrement('stok');
    
        if ($peminjaman->user->Email) {
            Notification::route('mail', $peminjaman->user->Email)
                ->notify(new PeminjamanApprovedNotification($peminjaman));
        }
    
        return response()->json($peminjaman, 200);
    }
    
    public function rejectBuku($id)
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], 404);
        }

        $peminjaman->update(['StatusPeminjaman' => 'REJECTED']);

        if ($peminjaman->user->Email) {
            Notification::route('mail', $peminjaman->user->Email)
                ->notify(new PeminjamanRejectedNotification($peminjaman));
        }

        return response()->json($peminjaman, 200);
    }
}
