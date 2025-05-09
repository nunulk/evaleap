<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class JoinTeamController extends Controller
{
    public function create(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        $teamsToJoin = Team::query()
            ->where('organization_id', $user->organization_id)
            ->whereNotExists(function ($query) use ($user) {
                $query->select(DB::raw(1))
                    ->fromRaw('team_user')
                    ->whereColumn('team_user.team_id', 'teams.id')
                    ->where('team_user.user_id', '=', $user->id);
            })
            ->get();

        return Inertia::render('teams/join/create', ['teams' => $teamsToJoin]);
    }

    public function store(Request $request): RedirectResponse
    {
        $team = Team::findOrFail($request->input('id'));
        if ($request->user()->cannot('view', $team)) {
            abort(403);
        }
        $user = $request->user();
        if ($team->users()->where('id', $user->id)->count() === 0) {
            $team->users()->attach($user);
        }

        return redirect()->intended(route('teams.join.create'));
    }
}
