<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    public function show($userID)
    {
        $user = User::findOrFail($userID);
        return response()->json(['user' => $user]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'Email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'NamaLengkap' => ['required', 'string', 'max:255'],
            'Alamat' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'in:admin,petugas,peminjam'],
            'status' => ['required', 'string', 'in:active,registered,inactive'],
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
            'role' => $request->role,
            'email_verified' => false,
            'verification_token' => sha1(time()),
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }

public function update(Request $request, $id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $validator = Validator::make($request->all(), [
        'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->UserID . ',UserID'],
        'password' => ['required', 'string', 'min:8'],
        'Email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->UserID . ',UserID'],
        'NamaLengkap' => ['required', 'string', 'max:255'],
        'Alamat' => ['required', 'string', 'max:255'],
        'role' => ['required', 'string', 'in:admin,petugas,peminjam'],
        'status' => ['required', 'string', 'in:active,registered,inactive'],
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Field email_verified dan verification_token tidak di-update karena itu bukan data yang seharusnya diubah dari luar.
    $user->update([
        'username' => $request->username,
        'password' => Hash::make($request->password), // Mengenkripsi password baru
        'email' => $request->Email,
        'NamaLengkap' => $request->NamaLengkap,
        'Alamat' => $request->Alamat,
        'role' => $request->role,
        'status' => $request->status,
    ]);

    return response()->json(['user' => $user], 200);
}

    public function delete($userID)
    {
        $user = User::findOrFail($userID);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function activate($userID)
    {
        $user = User::findOrFail($userID);

        if ($user->status === 'inactive') {
            $user->status = 'active';
            $user->save();

            return response()->json(['message' => 'User activated successfully']);
        }

        return response()->json(['message' => 'User is already active']);
    }

    public function deactivate($userID)
    {
        $user = User::findOrFail($userID);

        if ($user->status === 'active') {
            $user->status = 'inactive';
            $user->save();

            return response()->json(['message' => 'User deactivated successfully']);
        }

        return response()->json(['message' => 'User is already inactive']);
    }
}
