<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientPermis extends Model
{
    protected $Fillable = [
        'client_id',
        'permis_type_id',
    ];
}
