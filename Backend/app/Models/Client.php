<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Authenticatable
{
    use HasApiTokens;
    protected $fillable = [
        'cin',
        'firstname',
        'lastname',
        'email',
        'password',
        'telephone',
        'address',
        'picture',
        'front_picture_of_identity',
        'back_picture_of_identity',
        'permis_type_id',
    ];
    protected $hidden = ['password'];
    protected $appends = ['role'];
    public function getRoleAttribute()
    {
        return 'client';
    }
}
