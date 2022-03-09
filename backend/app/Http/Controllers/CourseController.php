<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Course;
use App\Models\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CourseController extends Controller
{
    public function getCourse() {
        $courses = Course::all();
        $response = [
            "message" => "all Courses list",
            "status" => "success",
            "code" => 201,
            "count" => $courses->count(),
            'courses' => $courses,
        ];
        return $response;
    }

    public function create(Request $request)
    {
        $validated = Validator::make($request->all(),[
            'name' => 'required|unique:courses',
            'description' => 'required',
        ]);
        if ($validated->fails()) {
            $response = $validated->errors();
            return $response;
        }
        $course = new Course();
        $course_information = $course->create($request->all()); 
        $response = [
            "message" => "Course created successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "course" => $course_information
        ];
        return $response;
    }

    public function update(Request $request)
    {
        
        $validated = Validator::make($request->all(),[
            "id" => "exists:courses",
            'name' => 'required',
            'description' => 'required'
        ]);
        if ($validated->fails()) {
            $response = $validated->errors();
            return $response;
        }
        $course_id = $request->id;
        $course = Course::find($course_id);
        $course->update($request->all()); 
        $course_information = Course::find($course_id);
        $response = [
            "message" => "Course updated successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
            "course" => $course_information
        ];
        return $response;
    }
    public function delete(Request $request) {
        $validated = Validator::make($request->all(),[
            "id" => "exists:courses",
        ]);
        if ($validated->fails()) {
            $response = $validated->errors();
            return $response;
        } else {
            Course::destroy($request->id);
        }
        $response = [
            "message" => "Course deleted successfully",
            "status" => "success",
            "code" => 201,
            "count" => 1,
        ];
        return $response;
    }
}
