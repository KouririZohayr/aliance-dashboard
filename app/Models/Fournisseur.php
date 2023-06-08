<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Fournisseur extends Model
{
    use HasFactory, Searchable;
     
    protected $fillable = [
        "ICE" , "nom" , "adreasse" , "tel" ,"fix" ,"email"
    ];
    

    public function facturs(){
        return $this->hasMany(Facture::class, 'id_fournisseur');
    }
    #[SearchUsingPrefix(['id', 'email'])]
    public function toSearchableArray()
{
    return [
        'id' => (int) $this->id,
        'ICE' => $this->ICE ,
        'nom' => $this->nom,

        
    ];
}

}

