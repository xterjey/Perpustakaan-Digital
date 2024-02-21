<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Schema;

class VerificationController extends Controller
{
    public function verify(Request $request, $token)
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return view('error')->with('message', 'Token verifikasi tidak valid');
        }

        $expirationTime = now()->subHours(1);
        if ($user->created_at->lt($expirationTime)) {
            return view('error')->with('message', 'Tautan verifikasi telah kedaluwarsa');
        }

        if (Schema::hasColumn('users', 'email_verified_at')) {
            $user->markEmailAsVerified();
        }

        $user->status = 'active';
        $user->save();

        $user->verification_token = null;
        $user->save();

        event(new Verified($user));

        return view('success');
    }

    public function resend(Request $request)
    {
        $request->validate([
            'token' => 'required|exists:users,verification_token',
        ]);

        $user = User::where('verification_token', $request->token)->first();

        if (!$user) {
            return response()->json(['message' => 'Token verifikasi tidak valid'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email sudah terverifikasi'], 400);
        }

        // Anda bisa mengambil alamat email dari pengguna
        $email = $user->email;

        // Sekarang, Anda bisa mengirim ulang token ke alamat email yang ditemukan
        $user->verification_token = Str::random(60); // Generate new verification token
        $user->save();

        // Logika untuk mengirim ulang token ke alamat email

        return response()->json(['message' => 'Token verifikasi telah dikirim ulang']);
    }

}
