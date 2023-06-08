<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class statisticsController extends Controller
{
  public function lin_Bar_Chart(Request $request){
    $type_c = (int) $request->type ?? 0;
if ($type_c == 0){
    $categories = Categorie::all();
}else{
    $categories = Categorie::where('type', $type_c)->get();
}

    $datachart = [];
    foreach($categories as $categorie){
      $idcat =(int)$categorie->id ;
      $label = $categorie->intitule_CG ;
      $data =  DB::select("call emp_performance($request->year,$idcat)");
      $datachart[] = [
        "label"=> $label ,
        "data"=>$data
      ];
    }
    return  $datachart;

  }
  public function totalTop(){
    $currentYear= now()->year;
    $idAndName=[
      "1" =>  "chargeNonStocable",
      "10" =>"mobilisationMateriel",
      "11" =>"mobilisationMobilier",
      "12" =>  "mobilisatiAmenagements",
      "2" =>   "services",
      "6" =>  "travaux"
    ];
    /* "select calculate_total_by_categorie_and_y($currentYear,1) as chargeNonStocable", "key" => "chargeNonStocable" */
    $result=[] ;
    foreach($idAndName as  $key => $value){
      $resultArray = DB::selectOne("select calculate_total_by_categorie_and_y($currentYear,$key) as  $value")->$value;
      $result[$value] = $resultArray==NULL ? 0:$resultArray;
    };

    return $result ;
  }

}
