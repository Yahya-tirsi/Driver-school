<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
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
}
