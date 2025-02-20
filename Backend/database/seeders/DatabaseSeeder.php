<?php

namespace Database\Seeders;

use App\Models\admin;
use App\Models\PermisType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        admin::factory()->create([
            'cin' => 'BH123456',
            'firstname' => 'Mohammed',
            'lastname' => 'Naju',
            'email' => 'admin@admin.com',
            'password' => Hash::make('1234'),
            'telephone' => '0600112233',
            'address' => 'Hassania 2, Rue 52, N 59',
        ]);
        PermisType::factory()->create([
            'name' => 'A',
            'price' => '3200',
            'description' => 'pour les motocyclettes.',
        ]);

        PermisType::factory()->create([
            'name' => 'B',
            'price' => '3000',
            'description' => 'pour les voitures particulières.',
        ]);

        PermisType::factory()->create([
            'name' => 'C',
            'price' => '3500',
            'description' => 'pour les poids lourds.',
        ]);

        PermisType::factory()->create([
            'name' => 'D',
            'price' => '3800',
            'description' => 'pour les transports en commun.',
        ]);

        PermisType::factory()->create([
            'name' => 'E',
            'price' => '4000',
            'description' => 'pour les véhicules articulés.',
        ]);

        
        PermisType::factory()->create([
            'name' => 'F',
            'price' => '4200',
            'description' => ' pour les tracteurs agricoles.',
        ]);
        
    }
}
