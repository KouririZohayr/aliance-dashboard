<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ligne_facture extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_fact" , "description" , "pu" ,"quantite"  
    ];
    public function Facture(){
        return $this->belongsTo(Facture::class, 'id_fact');
    }
}
