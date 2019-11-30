<?php

namespace App\Http\Controllers\API\v1;

use App\Country;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CityController
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'country_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }

        $country = Country::find($request->input('country_id'));
        return response()->json([
            'data' => $country->cities
        ]);
    }
}
