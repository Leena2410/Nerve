<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

// Log in Routing
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate']);

Route::get('/signup', [UserController::class, 'signup'])->name('signup');
Route::post('/register', [UserController::class, 'store'])->name('register');

// Log out ::::: to do: move this inside an auth group
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::prefix('dashboard')->middleware('auth')->group(function(){
    Route::get('', [DashboardController::class, 'index'])->name('dashboard');
    Route::view('parent', 'dashboard.parent')->name('parent');
    Route::view('courses', 'dashboard.courses')->name('courses');
});
