<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'Email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'NamaLengkap' => ['required', 'string', 'max:255'],
            'Alamat' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'email' => $request->Email,
            'NamaLengkap' => $request->NamaLengkap,
            'Alamat' => $request->Alamat,
            'role' => 'peminjam',
            'email_verified' => false,
            'verification_token' => sha1(time()),
            'status' => 'registered',
        ]);


        event(new Registered($user));

        return response()->json(['message' => 'Pengguna terdaftar dengan berhasil. Silakan periksa email Anda untuk verifikasi.'], 201);
    }

    public function adminRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'admin',
            'status' => 'active',
            'email_verified' => true,
            'Email' => 'admin@example.com',
            'NamaLengkap' => 'Admin',
            'Alamat' => 'Alamat Admin',
        ]);

        return response()->json(['message' => 'Admin terdaftar dengan berhasil'], 201);
    }

    public function verify(Request $request, $token)
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
        }

        if ($user->role === 'admin') {
            return response()->json(['message' => 'Admin tidak memerlukan verifikasi email'], 400);
        }

        if (!$request->hasValidSignature()) {
            return response()->json(['message' => 'Tautan verifikasi tidak valid atau telah kedaluwarsa'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email sudah terverifikasi'], 400);
        }

        if ($user->markEmailAsVerified()) {
            $user->status = 'active';
            $user->save();
            event(new Verified($user));
        }

        return response()->json(['message' => 'Email berhasil terverifikasi']);
    }
}
