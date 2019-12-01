<?php

namespace App\Http\Controllers\API\v1;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController
{
    public function profile(Request $request)
    {
        $token = $request->input('api_token');
        if(!$token) {
            $token = get_bearer_token();
        }
        $user = User::where('api_token', $token)->first();
        
        $data['user']['data']['displayName'] = $user->name;
        $data['user']['data']['email'] = $user->email;
        $data['access_token'] = $user->api_token;
        if($user->org_creator) {
            $role = 'admin';
        } else {
            $role = 'user';
        }
        $data['user']['role'] = $role;
        return response()->json(
            $data
        );
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $token = $request->input('api_token');
        $user = User::where('api_token', $token)->first();
        $user->fill($request->all());
        if($request->input('password')) {
            $user->password = Hash::make($request->input('password'));
        }
        $user->save();

        $data['user']['data']['displayName'] = $user->name;
        $data['user']['data']['email'] = $user->email;
        if($user->org_creator) {
            $role = 'admin';
        } else {
            $role = 'user';
        }
        $data['user']['role'] = $role;
        $data['access_token'] = $user->api_token;
        return response()->json(
            $data
        );
    }

    public function teams(Request $request) {

        $token = $request->input('api_token');
        if(!$token) {
            $token = get_bearer_token();
        }
        $user = User::where('api_token', $token)->first();
        $teams = $user->teams;
        foreach($teams as $team)  {
            $team->city_name = $team->city->name;
            $team->member_count = $team->users->count();
            unset($team->city);
            unset($team->pivot);
            unset($team->users);
        }
        return response()->json([
            'data' => $teams
        ]);
    }

    public function userCarts(Request $request) {
        $token = $request->input('api_token');
        if(!$token) {
            $token = get_bearer_token();
        }
        $user = User::where('api_token', $token)->first();
        $teams = $user->teams;
        foreach($teams as $team)  {
            $team->city_name = $team->city->name;
            $team->member_count = $team->users->count();
            unset($team->city);
            unset($team->pivot);
            unset($team->users);
        }
        return response()->json([
            'data' => $teams
        ]);
    }
}
