<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Facture;
use App\Models\Souscategorie;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\DB;
use App\Models\Ligne_facture;
use Illuminate\Http\Request;


class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $factures = Facture::all() ;
        
        foreach($factures as $facture ) {
            $facture["totaline"] = DB::selectOne("SELECT total_lignes_facture_tva($facture->id) AS ttc ")->ttc;
            $facture["fournisseur"] = Fournisseur::find($facture->id_fournisseur)->nom ;
            $facture["sousCategorieIntitule"] = Souscategorie::find($facture->sousCategorie)->intitule_SC  ;
        }  
        return $factures;
        
        
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      

    $facture = new Facture([
            "numero_fact" => $request->date_fact,
            "date_fact" => $request->date_fact,
            "TVA" => $request->TVA,
            "id_fournisseur" => $request->id_fournisseur,
            "sousCategorie" => $request->sousCategorie ,
            'classeur' => $request->classeur,
            "description" => $request->description
        ]);
        $newfacture=$facture->save();
        
        
        foreach($request->items as $article){
            
            $article = new Ligne_facture([
                "description"=> $article["description"],
                "quantite" => $article["quantite"] ,
                "pu" => $article["pu"]
            ]);
            
            $facture->LigneFactures()->save($article);
            $article = null ;
        }; 
        return $newfacture ;

    }
    /* 
{
    "date_fact": "",
    "numero_fact": "21112222",
    "TVA": 20,
    "id_fournisseur": 1,
    "sousCategorie": null,
    "classeur": "2",
    "items": [
        {
            "id": "1",
            "description": "router",
            "quantite": 1,
            "pu": "1200"
        }
    ],
    "description": null
} */

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function show(Facture $facture)
    {
        
        $factures = Facture::find(21) ;
        $data["LigneFactures"]=$factures->LigneFactures;
        $data['fournisseur']=$factures->fournisseurs ;
        $data['facture']= Facture::find(21) ;
         return response()->json($data, 200 );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Facture $facture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Facture $facture)
    {
        //
    }
}
