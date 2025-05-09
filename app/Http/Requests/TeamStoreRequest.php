<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:30'],
            'withJoin' => ['boolean'],
        ];
    }

    public function validatedTeamRequest(): array
    {
        return collect($this->validated())->only('name')->toArray();
    }

    public function withJoin(): bool
    {
        return $this->boolean('withJoin');
    }
}
