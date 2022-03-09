<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Course;



class AuthController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            $response = $validator->errors();
            return $response;
        }

        if (! $token = auth()->attempt($validator->validated())) {
            $response = [
                'error' => 'Either email or password is wrong.'
            ];
            return $response;
        }
        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'role' => 'required|string'
        ]);
        if($validator->fails()){
            $response = $validator->errors();
            return $response;
        }
        if($request->role == 'student') {
            Student:: create(
                ['name'=>$request->name],
            );
        }
        $user = User::create(array_merge($validator->validated(),
            ['password' => bcrypt($request->password)],
        ));
        $response = [
            'message' => 'User successfully registered',
            "status" => "success",
            "code" => 201,
            "count" => 1,
            'user' => $user
        ];
        return $response;
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        $response = ['message' => 'User successfully logged out'];
        return $response;
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        $response = [
            'message' => 'User login successfully',
            "status" => "success",
            "code" => 201,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ];
        return $response;
    }
}
