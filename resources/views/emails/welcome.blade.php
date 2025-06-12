<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding: 40px 10px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600"
                   style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">

                {{-- Header / Logo --}}
                <tr>
                    <td align="center" style="padding: 30px;">
                        @if (isset($applicationLogo))
                            {!! $applicationLogo !!}
                        @else
                            <h1 style="color: #9B77C7; font-size: 24px;">{{ config('app.name') }}</h1>
                        @endif
                    </td>
                </tr>

                {{-- Greeting --}}
                <tr>
                    <td style="padding: 20px 40px; color: #333;">
                        <h2 style="margin: 0 0 10px;">Welkom, {{ $user->name }}!</h2>
                        <p style="margin: 0 0 20px;">Bedankt voor je registratie bij onze app. We zijn blij je aan boord
                            te hebben!</p>
                    </td>
                </tr>

                {{-- Verify button --}}
                <tr>
                    <td align="center" style="padding: 0 40px 30px;">
                        <a href="{{ $verifyUrl }}"
                           style="background-color: #9B77C7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; font-weight: bold;">
                            Bevestig je e-mailadres
                        </a>
                        <p style="margin-top: 15px; color: #777;">Deze link verloopt binnen 60 minuten.</p>
                    </td>
                </tr>

                {{-- Veryfiy url in case of failrure button not clicked --}}
                <tr>
                    <td style="padding: 20px 40px; color: #333;">
                        <p>Als de knop hierboven niet werkt, kopieer dan de volgende link in je browser:</p>
                        <p><a href="{{ $verifyUrl }}" style="color: #9B77C7;">{{ $verifyUrl }}</a></p>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 20px 40px; color: #333;">
                        <p>Als je deze registratie niet hebt aangevraagd, negeer dan deze e-mail.</p>
                        <p>Voor vragen of ondersteuning kun je altijd contact met ons opnemen via onze <a
                                href="{{ route('about') }}">contactpagina</a>.</p>
                    </td>
                </tr>

                {{-- Footer --}}
                <tr>
                    <td style="padding: 20px 40px; font-size: 12px; color: #999; text-align: center;">
                        &copy; {{ date('Y') }} {{ config('app.name') }}. Alle rechten voorbehouden.
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
