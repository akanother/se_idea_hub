<?php

namespace App\Http\Controllers\BookManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    //
    public function index() {

        return Inertia::render('App');
    }
}
