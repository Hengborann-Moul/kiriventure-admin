<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if (Auth::check() && Auth::user()->isAdmin == "1") {
            return View('home');
        }
        Auth::logout();
        return redirect('/login');

    }

    /**
     * Logout function
     * @return null
     */
    public function logout(){
        Auth::logout();
        return redirect('/login');
    }

}
