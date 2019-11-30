<?php

namespace App\Http\Controllers\API\v1;

use App\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TeamController
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'delivery_address' => 'required',
            'city_id' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $team = Team::create($request->all());
        $api_token = $request->input('api_token');
        if(!$api_token) {
            $api_token = get_bearer_token();
        }
        $user = User::where('api_token', $api_token)->first();
        $team->users()->attach($user->id);
        $user->org_creator = 1;
        $user->save();
        return response()->json(
            ['data' => $team ]
        );
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'delivery_address' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $team = Team::create($request->all());
        return response()->json(
            ['data' => $team ]
        );
    }

    public function delete(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'delivery_address' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $team = Team::create($request->all());
        return response()->json(
            ['data' => $team ]
        );
    }
}
