<?php

namespace App\Http\Controllers\API\v1;

use App\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
        if (!$api_token) {
            $api_token = get_bearer_token();
        }
        $user = User::where('api_token', $api_token)->first();
        $team->users()->attach($user->id);
        $user->org_creator = 1;
        $user->save();
        return response()->json(
            ['data' => $team]
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
            ['data' => $team]
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
            ['data' => $team]
        );
    }

    public function addTeamMember(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'team_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        } else {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make('password'),
                'api_token' => Str::random(60),
            ]);
            $user->teams()->attach($request->input('team_id'));
            return response()->json([
                'data' => $user
            ]);
        }
    }
}
