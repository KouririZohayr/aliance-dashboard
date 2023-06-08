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
    public function index(Request $request)
    {
        $ro = $request->row;
        $idf = $request->IDf;
        $order = $request->order ?? 'id';
        $desc = $request->DESC || TRUE;
        $query = $request->q;

        if (!empty($query)) {
            $factures = Facture::where('description', 'LIKE', "%{$query}%")
                        ->orderBy($order, $desc ? 'DESC' : 'ASC')->where("etat",1)
                       ->paginate($ro);
       } else {
             $factures = Facture::orderBy($order, $desc ? 'DESC' : 'ASC')->where("etat",1)
                         ->paginate($ro);
        }
        foreach($factures as $facture ) {
            $facture["totaline"] = DB::selectOne("SELECT total_lignes_facture_tva($facture->id) AS ttc ")->ttc;
            $facture["fournisseur"] = Fournisseur::find($facture->id_fournisseur)->nom ;
            $facture["sousCategorieIntitule"] = Souscategorie::find($facture->sousCategorie)->intitule_SC  ;
        }
        return $factures;


    }
    public function index2(Request $request)
    {
        $ro = $request->row;
        $idf = $request->IDf;
        $order = $request->order ?? 'id';
        $desc = $request->DESC || TRUE;
        $query = $request->q;

       if (!empty($query)) {
             $factures = Facture::search($query)
                         ->orderBy($order, $desc ? 'DESC' : 'ASC')->where("etat",0)
                        ->paginate($ro);
        } else {
             $factures = Facture::orderBy($order, $desc ? 'DESC' : 'ASC')->where("etat",0)
                         ->paginate($ro);
        }
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
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function show( $facture)
    {

        $factures = Facture::find($facture) ;
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
    public function update(Request $request, $id)
    {
        $facture = Facture::find($id);
        $facture->date_fact=$request->date_fact ;
        $facture->numero_fact=$request->numero_fact ;
        $facture->TVA=$request->TVA ;
        $facture->description=$request->description ;
        $facture->id_fournisseur=$request->id_fournisseur ;
        $facture->save();
        $facture->LigneFactures()->delete();
        foreach($request->items as $article){
            $article = new Ligne_facture([
                "description"=> $article["description"],
                "quantite" => $article["quantite"] ,
                "pu" => $article["pu"]
            ]);
            $facture->LigneFactures()->save($article);
            $article = null ;
        };
        return $facture;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$facture )
    {
        $facturesuppeimer =Facture::find($facture);
        if($facturesuppeimer->etat==1){
            Facture::where('id', $facture)->update(['etat' => 0]);
        }elseif($request->recupere=0){
          destroy($facturesuppeimer);
        }
        $facturesup =Facture::find($facture);
    }
    public function recuperer(Request $request){

        $facturesuppeimer =Facture::find($request->factDelet);
        Facture::where('id', $facturesuppeimer->id)->update(['etat' => 1]);

    }
}
