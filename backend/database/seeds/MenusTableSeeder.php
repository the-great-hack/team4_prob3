<?php

use App\Menu;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i = 0; $i < 10; $i++) {
            for ($j = 0; $j < 10; $j++) {
                Menu::create([
                    'name' => $faker->sentence($nbWords = 4, $variableNbWords = true),
                    'price' => $faker->numberBetween($min = 400, $max = 1200),
                    'restaurant_id' => $i + 1
                ]);
            }
        }
    }
}
