<?php

use Illuminate\Http\Request;
header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['api']], function () {
    Route::post('v1/auth/signup', 'API\v1\AuthController@signup');
    Route::post('v1/auth/login','API\v1\AuthController@login');
    Route::post('v1/user/access-token', 'API\v1\AuthController@accessToken');

    Route::get('v1/city/list', 'API\v1\CityController@index');

    Route::get('v1/restaurant', 'API\v1\RestaurantController@index');
    Route::get('v1/menu/restaurant/{id}', 'API\v1\MenuController@show');
});

Route::group(['middleware' => ['api', 'auth:api']], function () {
    Route::get('v1/user', 'API\v1\UserController@profile');
    Route::post('v1/user/update', 'API\v1\UserController@update');

    Route::get('v1/user/teams', 'API\v1\UserController@teams');
    Route::get('v1/user/carts', 'API\v1\UserController@userCarts');

    Route::post('v1/team/store', 'API\v1\TeamController@store');
    Route::post('v1/team/{id}/update', 'API\v1\TeamController@update');
    Route::post('v1/team/{id}/delete', 'API\v1\TeamController@delete');

    Route::post('v1/team/member/store', 'API\v1\TeamController@addTeamMember');

    Route::post('v1/cart/create', 'API\v1\CartController@create');
    Route::get('v1/cart/team/{id}', 'API\v1\CartController@teamCarts');
    Route::get('v1/cart/{id}/items', 'API\v1\CartController@cartItems');

    Route::post('v1/cart/item/add','API\v1\CartController@addItemtoCart');
    Route::post('v1/cart/item/{id}/delete','API\v1\CartController@removeItemtoCart');

    Route::post('v1/order/store','API\v1\OrderController@store');
    
});