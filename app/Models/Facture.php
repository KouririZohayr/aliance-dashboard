<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    protected $fillable = [
        "numero_fact" , "date_fact" , "TVA" , "id_fournisseur" , "sousCategorie" , "classeur" , "description"
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
}
