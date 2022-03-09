<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VideosController extends Controller
{
    public function create(Request $request)
    {
        
        $validated = Validator::make($request->all(),[
            'url' => 'required|unique:videos',
            'course_id' =>'required|exists:courses,id'
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 422);
        }
        $video = new Video();
        $video->create($request->all()); 
        $response = [
            "message" => "video created successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "course" => [
                "url" => $request->url,
                "course_id" => $request->course_id
            ]

        ];
        return $response;

    }
    public function getVideos($id) {
        $videos = Video :: all();
        if($id) {
            $course = Video:: with('course')->get();
        }
        return response()->json([
            "message" => "list of course videos",
            "status" => "success",
            "code" => 201,
            "count" => $videos->count(),
            'course' => $course
        ], 201);
    }

    public function update(Request $request)
    {
        $video_id = $request->id;
        $video = Video::find($video_id);
        $video->update($request->all()); 
        $response = [
            "message" => "Video updated successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "course" => [
                "url" => $video->url,
                "course_id" => $video->course_id
            ]
        ];
        return $response;
    }

    public function delete(Request $request) {
        $video = Video::destroy($request->id);
        $response = [
            "message" => "Video deleted successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
        ];
        return $response;
    }
}
