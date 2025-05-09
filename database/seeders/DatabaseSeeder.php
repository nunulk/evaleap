<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AdminSeeder::class);
        $this->call(OrganizationSeeder::class);
        $organization = Organization::first();
        $this->callWith(UserSeeder::class, ['organization' => $organization]);
        $this->callWith(TeamSeeder::class, ['organization' => $organization]);

        /** @var User $user */
        $user = User::first();
        /** @var Team $team */
        $team = Team::first();

        $team->addMember($user);
    }
}
