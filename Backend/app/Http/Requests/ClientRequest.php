<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cin' => 'required|unique:clients,cin',
            'firstname' => 'required',
            'lastname' => 'required|',
            'email' => 'required|email|unique:clients,email',
            'password' => 'required',
            'telephone' => 'required',
            'address' => 'required',
            'picture' => 'required',//here i have a problem of validating file formt
            'front_picture_of_identity' => 'required',
            'back_picture_of_identity' => 'required',
            'permis_type_id' => 'required',
        ];
    }
}
