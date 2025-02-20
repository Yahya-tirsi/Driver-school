<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class admin extends Authenticatable
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'cin',
        'firstname',
        'lastname',
        'email',
        'password',
        'telephone',
        'address',
    ];
    protected $hidden = ['password'];
    protected $appends = ['role'];
    public function getRoleAttribute()
    {
        return 'admin';
    }
}
