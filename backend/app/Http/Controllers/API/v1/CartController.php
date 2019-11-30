<?php

namespace App\Http\Controllers\API\v1;

use App\Cart;
use App\OrderItem;
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

    public function addItemtoCart(Request $request) {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required',
            'menu_id' => 'required',
            'quantity' => 'required',
            'schedule_for' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }

        $cart = Cart::where('team_id',request()->input('team_id'))->where('id',request()->input('cart_id'))->first();
        if($cart) {
            $order_item = OrderItem::create([
                'cart_id' => request()->input('cart_id'),
                'menu_id' => $request->input('menu_id'),
                'user_id' => $request->input('user_id'),
                'quantity' => $request->input('quantity'),
                'schedule_for' => $request->input('schedule_for'),
            ]);
            $order_item->total = $order_item->menu->price * $request->input('quantity');
            $order_item->save();
            $cart->cart_total += $order_item->total;
            $cart->save();
            return response()->json([
                'data' => 'item added to cart'
            ]);
        } else {
            return response()->json([
                'error' => 'error adding item'
            ]);
        }
    }

    public function removeItemtoCart(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $order_item = OrderItem::where('id',$id)->where('user_id',request()->input('user_id'))->first();
        if($order_item) {            
            $cart = $order_item->cart;
            $cart->cart_total -= $order_item->total;
            $cart->save();
            $order_item->delete();

            return response()->json([
                'data' => 'item removed'
            ]);
        } else {
            return response()->json([
                'error' => 'error removing item'
            ]);
        }
    }
}
