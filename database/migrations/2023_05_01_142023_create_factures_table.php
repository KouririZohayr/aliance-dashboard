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
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->string('numero_fact',30);
            $table->dateTime('date_fact');
            $table->integer('TVA');
            $table->unsignedbiginteger('id_fournisseur');
            $table->foreign('id_fournisseur')->references('id')->on('fournisseurs')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedbiginteger('sousCategorie');
            $table->foreign('sousCategorie')->references('id')->on('souscategories')->onDelete('cascade')->onUpdate('cascade');
            $table->string('classeur',10);
            $table->string('description');
            $table->unique(['numero_fact','id_fournisseur']);
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
        Schema::dropIfExists('factures');
    }
};
