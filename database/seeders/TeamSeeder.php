<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Organization $organization): void
    {
        Team::factory()->for($organization)->create();
    }
}
