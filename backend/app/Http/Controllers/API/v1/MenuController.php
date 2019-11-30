<?php

namespace App\Http\Controllers\API\v1;

use App\Menu;

class MenuController
{
    public function show($id)
    {
        $menus = Menu::where('restaurant_id',$id)->get();
        return response()->json(
            ['data' => $menus ]
        );
    }
}
