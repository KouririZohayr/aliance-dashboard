<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Laravel\Scout\Searchable;

class Facture extends Model
{
    use HasFactory,Searchable;
    protected $primaryKey  = "id" ;
    protected $fillable = [
        "id",  "numero_fact" , "date_fact" , "TVA" , "id_fournisseur" , "sousCategorie" , "classeur" , "description"
    ] ;
    public function fournisseurs(){
        return $this->belongsTo(Fournisseur::class, 'id_fournisseur');
    }
    public function LigneFactures(){
        return $this->hasMany(Ligne_facture::class, 'id_fact');
    }
    public function souscategorie(){
        return $this->hasMany(Souscategorie::class, 'sousCategorie');
    }
    #[SearchUsingPrefix(['id', 'email'])]
    public function toSearchableArray()
{
    return [
        'numero_fact' => (int) $this->numero_fact ,
        'classeur' => $this->classeur ,
        // 'sousCategorie' => Souscategorie::find(sousCategorie->intitule_SC)->this->sousCategorie,
    ];
}
}
