<?php

use App\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for($i=0; $i<10; $i++) {
            Restaurant::create([
                'name' => $faker->catchPhrase(),
                'city_id' => 1
            ]);
        }
    }
}