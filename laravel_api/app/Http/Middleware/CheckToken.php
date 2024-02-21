<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
