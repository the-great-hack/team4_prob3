<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'team_id',
    ];

    public function cart() {
        return $this->belongsTo(Team::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }
}
