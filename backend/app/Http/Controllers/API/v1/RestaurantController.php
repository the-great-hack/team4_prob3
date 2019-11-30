<?php

namespace App\Http\Controllers\API\v1;

use App\Restaurant;
use App\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RestaurantController
{
    public function index()
    {
        $restaurants = Restaurant::where('city_id',1)->get();
        return response()->json(
            ['data' => $restaurants ]
        );
    }
}
