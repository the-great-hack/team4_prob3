<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'delivery_address', 'lat', 'lng', 'city_id'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function city() {
        return $this->belongsTo(City::class);
    }

    public function carts() {
        return $this->hasMany(Cart::class);
    }
}
