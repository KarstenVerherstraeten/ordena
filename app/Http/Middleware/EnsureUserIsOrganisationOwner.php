<?php

namespace App\Http\Middleware;

use App\Models\Organisation;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsOrganisationOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $organisation = $request->route('organisation');

        // Als het al een model is (bij route-model binding), gebruik het gewoon
        if ($organisation instanceof Organisation) {
            if ($organisation->owner_id !== auth()->id()) {
                abort(403, 'Je bent niet de eigenaar van deze organisatie.');
            }
        } else {
            // Fallback als het toch geen model is (bijvoorbeeld via ID)
            $organisation = Organisation::findOrFail($organisation);
            if ($organisation->owner_id !== auth()->id()) {
                abort(403, 'Je bent niet de eigenaar van deze organisatie.');
            }
        }

        return $next($request);
    }
}
