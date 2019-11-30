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
});

Route::group(['middleware' => ['api', 'auth:api']], function () {
    Route::get('v1/user', 'API\v1\UserController@profile');
    Route::post('v1/user/update', 'API\v1\UserController@update');

    Route::post('v1/team/store', 'API\v1\TeamController@store');
    Route::post('v1/team/{id}/update', 'API\v1\TeamController@update');
    Route::post('v1/team/{id}/delete', 'API\v1\TeamController@delete');
});