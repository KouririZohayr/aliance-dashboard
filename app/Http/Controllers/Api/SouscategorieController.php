<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Souscategorie;
use Illuminate\Http\Request;

class SouscategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Souscategorie::all();
       
             
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Souscategorie  $souscategorie
     * @return \Illuminate\Http\Response
     */
    public function show(Souscategorie $souscategorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Souscategorie  $souscategorie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Souscategorie $souscategorie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Souscategorie  $souscategorie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Souscategorie $souscategorie)
    {
        //
    }
}
