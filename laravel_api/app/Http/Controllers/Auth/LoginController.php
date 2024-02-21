<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;


class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
    
        if (!$token = JWTAuth::attempt($request->only('username', 'password'))) {
            throw ValidationException::withMessages(['login' => 'Kredensial login tidak valid']);
        }
    
        $user = User::where('username', $request->username)->first();
    
        if (!$user || $user->role !== 'peminjam') {
            throw ValidationException::withMessages(['login' => 'Anda tidak memiliki akses untuk login.']);
        }
    
        if ($user->status !== 'active') {
            throw ValidationException::withMessages(['login' => 'Akun Anda tidak aktif.']);
        }
    
        return response()->json(['message' => 'Login berhasil', 'token' => $token, 'role' => 'peminjam'], 200);
    }
    
    public function adminlogin(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
    
        if (!$token = JWTAuth::attempt($request->only('username', 'password'))) {
            throw ValidationException::withMessages(['login' => 'Kredensial login tidak valid']);
        }
    
        $user = Auth::user();
    
        if ($user->role !== 'admin' && $user->role !== 'petugas') {
            throw ValidationException::withMessages(['login' => 'Kredensial login tidak valid untuk admin atau petugas']);
        }
    
        if ($user->status !== 'active') {
            throw ValidationException::withMessages(['login' => 'Akun Anda tidak aktif.']);
        }
    
        // Define different role keys for admin and petugas
        $role = $user->role === 'admin' ? 'admin' : 'petugas';
    
        return response()->json(['token' => $token, 'role' => $role]);
    }
    

    public function me(Request $request)
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->currentAccessToken();

        if ($accessToken) {
            $accessToken->delete();
            return response()->json(['message' => 'Berhasil keluar']);
        } else {
            return response()->json(['message' => 'Token akses tidak ditemukan'], 404);
        }
    }

}
