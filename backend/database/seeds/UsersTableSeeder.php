<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert( [
            [
                'name' => 'Daniyal Shahid',
                'email' => 'daniyal36@gmail.com',
                'password' => bcrypt('meow'),
                'api_token' => 'SXylj9SrzSxoEXXD0iMMqHUGw5jS36e3kM1px4M8dJlvXMTSykSsNp5MkoRm',
                'org_creator' => 1,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Adeel Tahir',
                'email' => 'adeeltahir19@gmail.com',
                'password' => bcrypt('meow'),
                'api_token' => 'SXylj9SrzSxoEXXD0iMMqHUGw5j436e3kM1px4M8dJlvXMTSykSsNp5MkoRm',
                'org_creator' => 1,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString()
            ]
        ]);
    }
}
