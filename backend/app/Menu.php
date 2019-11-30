<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'restaurant_id'
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
