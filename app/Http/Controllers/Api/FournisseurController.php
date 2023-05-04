<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Models\Facture;
use Illuminate\Http\Request;
use App\Models\Detailfacture;
use App\Models\Categorie;
class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fournisseur = Fournisseur::all();
        return response()->json($fournisseur);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newfournisseur=new Fournisseur([
            'ICE' => $request->ICE,
            'nom' => $request->nom,
            'adreasse' =>$request->adreasse,
            'tel' =>$request->tel,
            'fix' =>$request->fix,
            'email' =>$request->email
            ]);
            $newfournisseur->save();
            return response()->json($newfournisseur,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fournisseur $fournisseur)
    {
    
        
       return  response()->json($fournisseur);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fournisseur $fournisseur)
    {
        $fournisseur->update([
            'ICE' =>$request->ICE,
            'nom' =>$request->nom,
            'adreasse' =>$request->adreasse,
            'tel' =>$request->tel,
            'fix' =>$request->fix,
            'email' =>$request->email,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fournisseur $fournisseur)
    {
        //
    }
    public function categoryFournisseur(Fournisseur $fournisseur , $id )
    {
        $result=[];
        $fournisseur = Fournisseur::find($id);
        $fournisseur=$fournisseur->facturs;
        foreach($fournisseur as $factures ){
            $produits=$factures->Detailfactures;
            foreach($produits as $roduit){
                $categorie=Categorie::find($roduit->id_SC);
                $result["categorie"]=$categorie ;
            }
        }
       return  response()->json($result);
    }

}
