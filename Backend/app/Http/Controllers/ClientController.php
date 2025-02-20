<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request)
    {
        $formFields = $request->validated();

        $formFields['password'] = Hash::make($formFields['password']);
        if($request->hasFile('picture'))
        {
            $formFields['picture'] = $request->file('picture')->store('client','public');
        }
        if($request->hasFile('front_picture_of_identity'))
        {
            $formFields['front_picture_of_identity'] = $request->file('front_picture_of_identity')->store('client','public');
        }
        if($request->hasFile('back_picture_of_identity'))
        {
            $formFields['back_picture_of_identity'] = $request->file('back_picture_of_identity')->store('client','public');
        }

        $client = Client::create($formFields);
        return response()->json($client);
    }
    /**
     * Check if the specified email is already exist.
     */
    public static function isEmailExist(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $isExist = Client::where('email',$request->email)->exists();

        return response()->json(['exists' => $isExist]);
    }
    public static function isCinExist(Request $request)
    {
        $request->validate([
            'cin' => 'required',
        ]);

        $isExist = Client::where('cin',$request->cin)->exists();
        return response()->json(['exists' => $isExist]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
