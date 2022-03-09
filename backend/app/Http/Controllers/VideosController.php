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
            $response = $validated->errors();
            return $response;
        }
        $video = new Video();
        $videoInformation = $video->create($request->all()); 
        $response = [
            "message" => "video created successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "video" => $videoInformation

        ];
        return $response;

    }
    public function getVideos() {
        $videos = Video :: all();
        $response = [
            "message" => "list of course videos",
            "status" => "success",
            "code" => 201,
            "count" => $videos->count(),
            'course' => $videos
        ];
        return $response;
    }
    public function getCourseVideos($course_id) {
        $videos = Video::where('course_id', $course_id)->get();
        $response = [
            "message" => "list of course videos",
            "status" => "success",
            "code" => 201,
            "count" => $videos->count(),
            'videos' => $videos
        ];
        return $response;
    }
    public function update(Request $request)
    {
        $validated = Validator::make($request->all(),[
            "id" => "exists:videos",
        ]);
        if ($validated->fails()) {
            $response = $validated->errors();
            return $response;
        }
        $video_id = $request->id;
        $video = Video::find($video_id);
        $video->update($request->all());
        $video_information = Video::find($video_id); 
        $response = [
            "message" => "Video updated successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "video" => $video_information
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
