<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User;

class Admin extends User
{
    /** @use HasFactory<\Database\Factories\AdminFactory> */
    use HasFactory;

    protected $fillable = ['email', 'password'];
}
