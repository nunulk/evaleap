<?php
declare(strict_types=1);

namespace App\Http\Requests\Admin\Organization;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
        ];
    }
}
