<?php

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
        Schema::create('ligne_factures', function (Blueprint $table) {
            $table->id();
            $table->unsignedbiginteger('id_fact');
            $table->foreign('id_fact')->references('id')->on('factures');
            $table->string('description');
            $table->float('pu');
            $table->integer('quantite')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ligne_factures');
    }
};
