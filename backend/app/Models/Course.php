<?php

namespace App\Models;

use App\Models\Video;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Course extends Model
{
    use HasFactory;
    protected $table ='courses';
    protected $guarded = ['id'];
    public function course()
    {
        return $this->hasMany(Video::class);
        
    }
}
