<?php

namespace App\Http\Controllers\API\v1;

use App\Cart;
use App\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CartController
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'team_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $cart = Cart::create($request->all());
        return response()->json(
            ['data' => $cart]
        );
    }

    public function teamCarts($id) {
        $carts = Cart::where('team_id',$id)->get();
        return response()->json(
            ['data' => $carts]
        );
    }
}
