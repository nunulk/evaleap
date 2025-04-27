<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Organization\StoreRequest;
use App\Models\Organization;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::all();

        return Inertia::render('admin/organizations/index', ['organizations' => $organizations]);
    }

    public function show(Organization $organization)
    {
        return Inertia::render('admin/organizations/show', ['organization' => $organization]);
    }

    public function create()
    {
        return Inertia::render('admin/organizations/create');
    }

    public function store(StoreRequest $request)
    {
        Organization::create($request->validated());

        return redirect()->intended(route('admin.organizations.index', absolute: false));
    }
}
