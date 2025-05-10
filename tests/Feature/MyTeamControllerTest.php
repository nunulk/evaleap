<?php

use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('MyTeamController', function () {
    it('allows authenticated users to view my team page', function () {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('my-team'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('my-team')
                ->has('teams', 0)
            );
    });

    it('displays user teams correctly', function () {
        $user = User::factory()->create();
        $team1 = Team::factory()->create(['organization_id' => $user->organization_id]);
        $team2 = Team::factory()->create(['organization_id' => $user->organization_id]);
        Team::factory()->create(); // Another organization's team

        // Associate teams with the user
        $team1->addMember($user);
        $team2->addMember($user);
        // team3 is not attached to the user

        $this->actingAs($user)
            ->get(route('my-team'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('my-team')
                ->has('teams', 2)
                ->where('teams.0.id', $team1->id)
                ->where('teams.1.id', $team2->id)
                ->missing('teams.2')
            );
    });
});
