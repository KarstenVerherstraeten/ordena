<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>404 - Pagina niet gevonden</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
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
    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-2">Pagina niet gevonden</h2>
    <p class="mb-6">De pagina die je zoekt bestaat niet of is verplaatst.</p>
    <button onclick="window.history.back()"
            class="bg-primary hover:bg-[#8B67B7] text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow">
        ← Ga terug
    </button>
</div>

</body>
</html>
