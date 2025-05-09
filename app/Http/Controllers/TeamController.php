<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamStoreRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('teams/create');
    }

    public function store(TeamStoreRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        /** @var Team $team */
        $team = Team::create($request->validatedTeamRequest() + ['organization_id' => $user->organization_id]);
        if ($request->withJoin()) {
            $team->addMember($user);
        }

        return redirect()->intended(route('my-team'));
    }

    public function show(Request $request, Team $team): Response
    {
        if ($request->user()->cannot('view', $team)) {
            abort(403);
        }
        $members = $team->users;

        return Inertia::render('teams/show', compact('team', 'members'));
    }
}
