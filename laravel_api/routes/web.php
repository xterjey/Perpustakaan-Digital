<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;

// Route for the main page
Route::get('/', function () {
    return view('welcome');
});

Route::get('/verify/{token}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::get('/verification', 'VerificationController@index')->name('verification.index');
