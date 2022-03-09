<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\VideosController;





Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
    
], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/course', [CourseController::class, 'getCourse'])->name('course');
    Route::get('/course/{id}', [CourseController::class, 'getCourse']);
    Route::post('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/update', [CourseController::class, 'update'])->name('course.update');
    Route::post('/course/delete', [CourseController::class, 'delete'])->name('course.delete');

    Route::post('video/create', [VideosController::class, 'create'])->name('video.create');
    Route::get('video/{course_id}', [VideosController::class, 'getCourseVideos']);
    Route::get('video', [VideosController::class, 'getVideos'])->name('video');
    Route::post('video/update', [VideosController::class, 'update'])->name('video.update');
    Route::post('video/delete', [VideosController::class, 'delete'])->name('video.delete');
});
