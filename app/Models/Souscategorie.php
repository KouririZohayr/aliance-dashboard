<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Souscategorie extends Model
{
    use HasFactory;
    public function categorie(){
        return $this->belongsTo(Categorie::class, 'id_CG');
    } 
    public function factures(){
        return $this->haseMany(Facture::class, 'sousCategorie');
    } 
}
