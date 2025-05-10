<?php

namespace App\Console\Commands\Admin;

use App\Models\Admin;
use Illuminate\Console\Command;

class SetupCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:admin:setup {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize admin account';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (Admin::query()->count() > 0) {
            $this->error('Admin account already exists');
        }
        $adminEmail = config('app.admin.email');
        $email = $this->argument('email');
        $password = $this->argument('password');

        $this->info("email: $email");
        $this->info("password: $password");
        if ($email !== $adminEmail || ! $email || ! $password) {
            $this->error('valid email and password are required');

            return;
        }
        Admin::create(['email' => $email, 'password' => bcrypt($password)]);
        $this->info('Admin account created');
    }
}
