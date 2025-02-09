<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamenResult extends Model
{
    protected $fillable = [
        'client_id',
        'client_id',
        'isPassed',
    ];
}
