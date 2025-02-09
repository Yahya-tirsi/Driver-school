<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'description',
    ];
}
