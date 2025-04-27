<?php
declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\OrganizationController;

Route::group(['prefix' => 'admin'], function () {
    Route::group(['middleware' => 'guest'], function () {
        Route::get('/', [HomeController::class, 'index'])->name('admin.home');
        Route::post('/login', [AuthController::class, 'login'])->name('admin.login');
    });
    Route::group(['middleware' => ['auth:admin', 'verified']], function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
        Route::get('/organizations', [OrganizationController::class, 'index'])->name('admin.organizations.index');
        Route::get('/organizations/create', [OrganizationController::class, 'create'])->name('admin.organizations.create');
        Route::post('/organizations', [OrganizationController::class, 'store'])->name('admin.organizations.store');
        Route::get('/organizations/{organization}', [OrganizationController::class, 'show'])->name('admin.organizations.show');
    });
});
