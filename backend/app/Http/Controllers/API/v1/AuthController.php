<?php

namespace App\Http\Controllers\API\v1;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        } else {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'api_token' => Str::random(60),
            ]);
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
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }

        if(auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password') ])) {
            $user = auth()->user();
            
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
        } else {
            return response()->json([
                'error' => 'error validating your credentials'
            ]);
        }

    }

    public function accessToken(Request $request) {
        $validator = Validator::make($request->all(), [
            'accessToken' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }

        $token = $request->input('accessToken');
        
        $user = User::where('api_token', $token)->first();

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
}
