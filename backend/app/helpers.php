<?php

use Illuminate\Support\Str;

if (! function_exists('get_bearer_token')) {
    function get_bearer_token() {
        $header = request()->header('Authorization', '');
        if (Str::startsWith($header, 'Bearer ')) {
            return Str::substr($header, 7);
        } else {
            return null;
        }
    }
}