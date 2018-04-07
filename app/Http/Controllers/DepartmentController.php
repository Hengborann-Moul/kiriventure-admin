<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    private $departmentID = [
        ['id' => '-L5ieG7kK9sRj9p5Plk-', 'name' => 'Activity'],
        ['id' => '-L5ieOz3bSymDh1gK9mr', 'name' => 'Transportation'],
        ['id' => '-L5ieTIAAADMzQxqbi7E', 'name' => 'Front Office'],
        ['id' => '-L5iedxWWfwuJ9fENETW', 'name' => 'F&B'],
        ['id' => '-L5ieh5nqjaWdk1xvx4t', 'name' => 'HouseKeeping'],
        ['id' => '-L5iejzu0vNns3yNjkCy', 'name' => 'General Manager'],
        ['id' => '-L9IzEBrniySDJfkYu8T', 'name' => 'Operation Manager']    
    ];

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
            return View('department')->with('department', '-L5ieG7kK9sRj9p5Plk-')
                                    ->with();
        }
        Auth::logout();
        return View('auth.login');

    }

    public function department($depID){
        foreach($this->departmentID as &$item) {
            if($depID == $item['id']){
                return View('department')->with('department', $depID)
                                        ->with('name', $item['name']);
            }
        }
        Auth::logout();
        return redirect('/login');
    }

}
