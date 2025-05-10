<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyTeamController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $teams = $user->teams;

        return Inertia::render('my-team', compact('teams'));
    }
}
