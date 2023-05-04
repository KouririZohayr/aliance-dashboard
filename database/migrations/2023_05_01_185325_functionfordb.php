<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::raw('DROP FUNCTION IF EXISTS total_lignes_facture_tva;
            DELIMITER //
            CREATE  FUNCTION total_lignes_facture_tva(id_factt int) RETURNS float
            BEGIN
            DECLARE quntitePrix  float;
            DECLARE tv,total  float ;
            
            set tv =(SELECT TVA FROM factures WHERE id=id_factt);
            set quntitePrix = (SELECT SUM(pu * quantite *(1+tv/100)) FROM ligne_factures  WHERE id_fact=id_factt);
            
            RETURN quntitePrix;
            END//
            DELIMITER ;'
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
