<?php

use App\Http\Controllers\JoinTeamController;
use App\Http\Controllers\MyTeamController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('my-team', MyTeamController::class)->name('my-team');
    Route::get('teams/create', [TeamController::class, 'create'])->name('teams.create');
    Route::post('teams', [TeamController::class, 'store'])->name('teams.store');
    Route::get('teams/{team}', [TeamController::class, 'show'])->name('teams.show')->where('team', '[0-9]+');
    Route::get('teams/join', [JoinTeamController::class, 'create'])->name('teams.join.create');
    Route::post('teams/join', [JoinTeamController::class, 'store'])->name('teams.join.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
