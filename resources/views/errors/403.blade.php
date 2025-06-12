<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>403 - Geen toegang</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tailwind CDN (safe for error pages) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Optional: Custom theme -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#9B77C7',
                        dark: '#1f2937',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100 text-gray-800 flex flex-col items-center justify-center min-h-screen px-4">

<div class="text-center z-10">
    <h1 class="text-6xl font-bold text-primary mb-4">403</h1>
    <h2 class="text-2xl font-semibold mb-2">Geen toegang</h2>
    <p>Je hebt geen toestemming om deze pagina te bekijken.</p>
    <p class="mb-4">Denk je dat dit een fout is, neem dan contact op via <a href="{{ route('about') }}">contact</a></p>
    <button onclick="window.history.back()"
            class="bg-primary hover:bg-[#8B67B7] text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow">
        ← Ga terug
    </button>
</div>

</body>
</html>
