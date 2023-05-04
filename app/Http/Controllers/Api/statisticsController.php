<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class statisticsController extends Controller
{
  public function lin_Bar_Chart(Request $request){
    $categories = Categorie::all() ; 
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
}
