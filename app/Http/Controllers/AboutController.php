<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class AboutController extends Controller
{
    public function index()
    {
        return inertia('About');
    }

    public function team()
    {
        return inertia('About/Team');
    }

    public function contact()
    {
        return inertia('About/Contact');
    }

    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'message' => 'required|string|max:2000',
            'g-recaptcha-response' => 'required|captcha',
        ]);

        Mail::to('info@ordena.be')->send(new ContactFormMail($data));

        return back()->with('success', 'Message sent successfully!');
    }
}
