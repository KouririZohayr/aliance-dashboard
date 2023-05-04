<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\statisticsController;
use App\Http\Controllers\Api\FournisseurController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\SouscategorieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/signup', [AuthController::class, 'signup']);
  
Route::get('/statistique',[statisticsController::class, 'lin_Bar_Chart']);
    Route::apiResource('/fournisseur',FournisseurController::class);
    Route::apiResource('/categorie',CategorieController::class);
    Route::apiResource('/souscategorie',SouscategorieController::class);
    Route::Resource('/Facture',FactureController::class);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
});



Route::post('/login', [AuthController::class, 'login']);
