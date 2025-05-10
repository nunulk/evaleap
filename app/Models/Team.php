<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property-read int $organization_id
 */
class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    protected $fillable = ['name', 'organization_id'];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function addMember(User $user): void
    {
        $this->users()->attach($user);
    }
}
