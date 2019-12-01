<?php

namespace App\Http\Controllers\API\v1;

use App\Cart;
use App\Order;
use App\OrderItem;
use App\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CartController
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'team_id' => 'required',
            'cart_id' => 'required',
            'payable_amount' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $order = Order::create($request->all());
        return response()->json(
            ['data' => $order]
        );
    }
}
