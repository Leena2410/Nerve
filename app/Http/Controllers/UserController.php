<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function signup() {
        return view('auth.signin');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'university' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'university' => $validated['university'],
            'major' => $validated['major'],
            'password' => Hash::make($validated['password']),
        ]);

        // Auto-login the user after they register
        Auth::login($user);

        return response()->json([
            'status' => true,
            'message' => 'Account created successfully!',
            'redirect' => route('dashboard')
        ], 200);
    }
}
