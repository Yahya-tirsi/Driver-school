<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PermisTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::resource('permistypes',PermisTypeController::class);
Route::get('clients/check-email',[ClientController::class,'isEmailExist']);
Route::get('clients/check-cin',[ClientController::class,'isCinExist']);
Route::resource('clients',ClientController::class);

require __DIR__.'/auth.php';
