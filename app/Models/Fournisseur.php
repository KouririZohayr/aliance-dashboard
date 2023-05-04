<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;
    protected $fillable = [
        "ICE" , "nom" , "adreasse" , "tel" ,"fix" ,"email"
    ];

    public function facturs(){
        return $this->hasMany(Facture::class, 'id_fournisseur');
    }
}
