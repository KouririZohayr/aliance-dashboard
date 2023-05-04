<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    public function souscategories(){
        return $this->hasMany(Souscategorie::class, 'id_CG');
    } 
}
