<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>500 - Interne serverfout</title>
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
    <h1 class="text-6xl font-bold text-primary mb-4">500</h1>
    <h2 class="text-2xl font-semibold mb-2">Oeps! Er ging iets mis</h2>
    <p class="mb-6">Er is een interne serverfout opgetreden. Probeer het later opnieuw.</p>
</div>

</body>
</html>
