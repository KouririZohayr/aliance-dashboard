<?php

namespace Tests\Feature;
use App\Models\Fournisseur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FacturTEST extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
/*     public function test_example()
    {
        $response = $this->delete('/api/users/2');

        $response->assertStatus(200);
    } */
    public function testShow()
    {

        $fournisseur = Fournisseur::find(2);
        // Envoyer une requête GET à l'URL de l'exemple
        $response = $this->get('/api/fournisseur/' . $fournisseur->id);
        // Vérifier que la réponse a un code de statut 200 (OK)
        $response->assertStatus(200);
        // Vérifier que la vue renvoyée contient les données de l'exemple
        $response->assertSee($fournisseur->ICE);
        $response->assertSee($fournisseur->tel);
    }

    public function testUpdate()
    {
        $fournisseur = Fournisseur::find(2);
  
        // Envoyer une requête PUT à l'URL de l'exemple avec de nouvelles données
        $response = $this->put('/api/fournisseur/' . $fournisseur->id, [
        'nom' => 'Maroc telecom2',
        'tel' => '0660834914',
        ]);
        // Vérifier que la réponse a un code de statut 302 (redirection)
        $response->assertStatus(302);
        // Vérifier que les données de l'exemple ont été mises à jour dans la base de données
        $this->assertDatabaseHas('fournisseurs', [
        'id' => $example->id,
        'nom' => 'Nouveau nom',
        'tel' => '0660834914',
        ]);
    }
    
    /* public function testDelete()
    {
        // Créer un exemple de modèle pour le test
        $example = Example::factory()->create();
        // Envoyer une requête DELETE à l'URL de l'exemple
        $response = $this->delete('/example/' . $example->id);
        // Vérifier que la réponse a un code de statut 302 (redirection)
        $response->assertStatus(302);
        // Vérifier que l'exemple a été supprimé de la base de données
        $this->assertDatabaseMissing('examples', [
            'id' => $example->id,
        ]);
    }  */
    
}





