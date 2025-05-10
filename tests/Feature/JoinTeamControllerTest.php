<?php

use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('create method', function () {
    it('shows available teams to join for authenticated users', function () {
        $user = User::factory()->create();
        $team1 = Team::factory()->create(['organization_id' => $user->organization_id]);
        $team2 = Team::factory()->create(['organization_id' => $user->organization_id]);

        // Create a team for another organization
        $anotherTeam = Team::factory()->create();

        // Create a team that user is already a member of
        $joinedTeam = Team::factory()->create(['organization_id' => $user->organization_id]);
        $joinedTeam->users()->attach($user);

        $this->actingAs($user)
            ->get(route('teams.join.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('teams/join/create')
                ->has('teams', 2)
                ->where('teams.0.id', $team1->id)
                ->where('teams.1.id', $team2->id)
                // Ensure the team from another org and the already joined team are not included
                ->missing('teams.2')
            );
    });

    it('returns empty teams list when user has already joined all teams', function () {
        $user = User::factory()->create();
        $team = Team::factory()->create(['organization_id' => $user->organization_id]);
        $team->users()->attach($user);

        $this->actingAs($user)
            ->get(route('teams.join.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('teams/join/create')
                ->has('teams', 0)
            );
    });

    it('redirects unauthenticated users to login', function () {
        $this->get(route('teams.join.create'))
            ->assertRedirect(route('login'));
    });
});

describe('store method', function () {
    it('allows users to join a team from their organization', function () {
        $user = User::factory()->create();
        $team = Team::factory()->create(['organization_id' => $user->organization_id]);

        $this->actingAs($user)
            ->post(route('teams.join.store'), ['id' => $team->id])
            ->assertRedirect(route('teams.join.create'));

        $this->assertTrue($team->users()->where('users.id', $user->id)->exists());
    });

    it('prevents joining a team from another organization', function () {
        $user = User::factory()->create();
        $otherOrgTeam = Team::factory()->create(); // Different organization

        $this->actingAs($user)
            ->post(route('teams.join.store'), ['id' => $otherOrgTeam->id])
            ->assertStatus(403);

        $this->assertFalse($otherOrgTeam->users()->where('users.id', $user->id)->exists());
    });

    it('allows joining a team that exists', function () {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('teams.join.store'), ['id' => 999]) // Non-existent team
            ->assertStatus(404);
    });

    it('prevents joining a team twice', function () {
        $user = User::factory()->create();
        $team = Team::factory()->create(['organization_id' => $user->organization_id]);
        $team->users()->attach($user);

        // Try to join again
        $this->actingAs($user)
            ->post(route('teams.join.store'), ['id' => $team->id])
            ->assertStatus(400);

        // Check that there's only one connection (not duplicated)
        $this->assertEquals(1, $team->users()->where('users.id', $user->id)->count());
    });

    it('redirects unauthenticated users to login', function () {
        $team = Team::factory()->create();

        $this->post(route('teams.join.store'), ['id' => $team->id])
            ->assertRedirect(route('login'));
    });
});
