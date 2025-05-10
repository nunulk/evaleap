<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Organization $organization): void
    {
        User::factory()->for($organization)->create(['email' => "test@{$organization->domain}"]);
    }
}
