<?php

use App\Models\Organization;
use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('create method', function () {
    it('shows the team creation page for authenticated users', function () {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('teams.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('teams/create')
            );
    });

    it('redirects unauthenticated users to login', function () {
        $this->get(route('teams.create'))
            ->assertRedirect(route('login'));
    });
});

describe('store method', function () {
    it('creates a team without joining it when withJoin is false', function () {
        $user = User::factory()->create();
        $teamData = ['name' => 'New Team', 'withJoin' => false];

        $this->actingAs($user)
            ->post(route('teams.store'), $teamData)
            ->assertRedirect(route('my-team'));

        $this->assertDatabaseHas('teams', [
            'name' => 'New Team',
            'organization_id' => $user->organization_id,
        ]);

        $team = Team::where('name', 'New Team')->first();
        $this->assertFalse($team->users()->where('users.id', $user->id)->exists());
    });

    it('creates a team and adds the user as a member when withJoin is true', function () {
        $user = User::factory()->create();
        $teamData = ['name' => 'New Team With User', 'withJoin' => true];

        $this->actingAs($user)
            ->post(route('teams.store'), $teamData)
            ->assertRedirect(route('my-team'));

        $this->assertDatabaseHas('teams', [
            'name' => 'New Team With User',
            'organization_id' => $user->organization_id,
        ]);

        $team = Team::where('name', 'New Team With User')->first();
        $this->assertTrue($team->users()->where('users.id', $user->id)->exists());
    });

    it('validates required team fields', function () {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('teams.store'), [])
            ->assertSessionHasErrors(['name']);
    });

    it('redirects unauthenticated users to login', function () {
        $this->post(route('teams.store'), ['name' => 'Team Name'])
            ->assertRedirect(route('login'));
    });
});

describe('show method', function () {
    it('shows team details to users in the same organization', function () {
        $user = User::factory()->create();
        $team = Team::factory()->create(['organization_id' => $user->organization_id]);
        $team->addMember($user);

        $this->actingAs($user)
            ->get(route('teams.show', $team))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('teams/show')
                ->has('team')
                ->where('team.id', $team->id)
                ->where('team.name', $team->name)
                ->has('members')
            );
    });

    it('returns 403 when user is not in the same organization', function () {
        $user = User::factory()->create();
        $anotherOrganization = Organization::factory()->create();
        $team = Team::factory()->create(['organization_id' => $anotherOrganization->id]); // Different organization

        $this->actingAs($user)
            ->get(route('teams.show', $team))
            ->assertStatus(403);
    });

    it('redirects unauthenticated users to login', function () {
        $team = Team::factory()->create();

        $this->get(route('teams.show', $team))
            ->assertRedirect(route('login'));
    });
});
