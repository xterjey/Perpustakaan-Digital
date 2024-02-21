<?php

use App\Http\Controllers\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\KategoriBukuController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\UlasanBukuController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\KoleksiPribadiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/admin/register', [RegisterController::class, 'adminRegister']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/admin/login', [LoginController::class, 'adminlogin']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [LoginController::class, 'me']);
    Route::post('/logout', [LoginController::class, 'logout']);


    Route::get('/buku/{id}', [BukuController::class, 'show']);
    Route::put('/buku/{id}', [BukuController::class, 'update']);
    Route::delete('/buku/{id}', [BukuController::class, 'destroy']);


    Route::put('/kategoribuku/{id}', [KategoriBukuController::class, 'update']);
    Route::delete('/kategoribuku/{id}', [KategoriBukuController::class, 'destroy']);


});
Route::post('/peminjaman', [PeminjamanController::class, 'store']);
Route::get('/peminjaman', [PeminjamanController::class, 'index']);
Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show']);
Route::put('/peminjaman/{id}', [PeminjamanController::class, 'update']);
Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy']);

Route::get('/buku', [BukuController::class, 'index']);
Route::get('/kategoribuku', [KategoriBukuController::class, 'index']);
Route::get('/koleksipribadi/{userId}', [KoleksiPribadiController::class, 'index']);
Route::post('/koleksipribadi', [KoleksiPribadiController::class, 'store']);
Route::delete('/koleksipribadi/{id}', [KoleksiPribadiController::class, 'destroy']);

Route::get('/ulasanbuku/countrating/{bukuId}', [UlasanBukuController::class, 'countRating']);
Route::get('/ulasanbuku/user-review/{userId}/{bukuId}', [UlasanBukuController::class, 'getUserReview']);
Route::put('/ulasanbuku/{userId}/{bukuId}', [UlasanBukuController::class, 'updateUserReview']);
Route::get('/ulasanbuku/{bukuId}', [UlasanBukuController::class, 'show']);

Route::put('/peminjamans/{id}/approve', [PeminjamanController::class, 'approveBuku']);
Route::put('/peminjamans/{id}/reject', [PeminjamanController::class, 'rejectBuku']);
Route::put('/peminjaman/{id}/return', [PeminjamanController::class, 'returnBuku']);
Route::get('/peminjaman/user/{userId}', [PeminjamanController::class, 'userPeminjaman']);
Route::delete('/peminjaman/buku/{bookId}', [PeminjamanController::class, 'destroyByBookID']);

Route::post('/buku', [BukuController::class, 'store']);
Route::post('/kategoribuku', [KategoriBukuController::class, 'store']);



Route::get('/users', [UserManagementController::class, 'index']);
Route::get('/users/{userID}', [UserManagementController::class, 'show']);
Route::post('/users', [UserManagementController::class, 'store']);
Route::put('/users/{userID}', [UserManagementController::class, 'update']);
Route::delete('/users/{userID}', [UserManagementController::class, 'delete']);

Route::put('/users/{userID}/activate', [UserManagementController::class, 'activate']);
Route::put('/users/{userID}/deactivate', [UserManagementController::class, 'deactivate']);
