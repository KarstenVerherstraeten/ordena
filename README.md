<p align="center">
  <a href="https://www.ordena.be" target="_blank">
    <img src="https://github.com/user-attachments/assets/fd249d08-74c4-4831-b715-f55c30f54936" alt="Logo Ordena" style="width: 400px; height: auto;">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/KarstenVerherstraeten/ordena" alt="GitHub repo size">
  <img src="https://img.shields.io/github/issues/KarstenVerherstraeten/ordena" alt="GitHub issues">
  <img src="https://img.shields.io/github/issues-pr/KarstenVerherstraeten/ordena" alt="GitHub pull requests">
  <img src="https://img.shields.io/github/last-commit/KarstenVerherstraeten/ordena" alt="GitHub last commit">
  <img src="https://img.shields.io/github/license/KarstenVerherstraeten/ordena" alt="License">
</p>

---

## 🧠 Wat is Ordena?

Ordena is een platform dat het bewustzijn rond autisme vergroot. Organisatoren kunnen activiteiten delen, terwijl psychologen, ouders, leerkrachten en personen met ASS bijdragen aan een centrale kennisbank. Dit helpt iedereen om beter inzicht te krijgen in het leven met autisme.

---

## 🚀 Features

- 📚 Kennisbank voor ouders, leerkrachten, psychologen en mensen met ASS om tips en ervaringen te delen.
- 📅 Activiteitenpagina waar organisatoren prikkelarme evenementen kunnen posten.
- 🧭 Een heldere "Over Ordena"-pagina voor vragen en ondersteuning.
- 🏠 Een overzichtelijke homepage met een duidelijke route voor je ontdekkingstocht over autisme.

---

## 📑 Inhoudstafel

- [Installatie](#installatie)
- [Bronnen](#Bronnen)
- [ChatGPT Gesprekken](#ChatGPT-Gesprekken)
- [Auteur](#Auteur)
- [Licentie](#Licentie)

---

## 🛠️ Installatie

### 📌 Project lokaal opstarten

Volg de officiële [Laravel installatiegids](https://laravel.com/docs/12.x/installation)

1. Clone de repository:
```bash
git clone https://github.com/KarstenVerherstraeten/ordena.git
```

2. Navigeer naar de projectmap:
```bash
cd ordena
```

3. Installeer de dependencies:
```bash
npm install
composer install
```

4. Genereer `.env`-bestand en pas aan:
```bash
cp .env.example .env
php artisan key:generate
```

5. Maak de database aan en voer migraties uit:
```bash
php artisan migrate
```

6. Start de server en de Vite dev server:
```bash
php artisan serve
npm run dev
```

Bezoek [http://127.0.0.1:8000](http://127.0.0.1:8000) of het adres dat in de terminal wordt weergegeven.

---

## 📚 Bronnen

- [Laravel Documentatie](https://laravel.com/docs/12.x)
- [React Documentatie](https://react.dev/)
- [W3Schools](https://www.w3schools.com/)
- [Tailwind CSS Docs](https://v2.tailwindcss.com/docs)
- [React Toastify (notificaties)](https://www.npmjs.com/package/react-toastify)
- [React Slick (image slider)](https://react-slick.neostack.com/docs/get-started)
- [GitHub Copilot](https://github.com/features/copilot)
- [JetBrains AI](https://www.jetbrains.com/ai/#)
- [EHB Back-end Course](https://canvas.ehb.be/courses/33609)

---

## 💬 ChatGPT Gesprekken

- [Ordena | Blobs Overflow Solution](https://chatgpt.com/share/684af4db-9828-800f-b0c3-ddb28b5e362e)
- [Ordena | Role middleware optimalisatie](https://chatgpt.com/share/684af4cc-84dc-800f-8798-22cb3cc2b1cb)
- [Ordena | Grid Layout with Roles](https://chatgpt.com/share/684af4b8-183c-800f-8a25-c6f19c449cad)
- [Ordena | Dynamische breadcrumbs maken](https://chatgpt.com/share/684af4a8-d934-800f-bf04-48f2b97595f1)
- [Ordena | Organisation users pivot table](https://chatgpt.com/share/684af498-788c-800f-a4b6-538fa9ec9292)
- [Ordena | Frontend vs Backend Security](https://chatgpt.com/share/684af484-e748-800f-9ae4-b8e1f2008b48)
- [Ordena | Word cycling control logic](https://chatgpt.com/share/684af472-8978-800f-ae1a-31b0116aad88)
- [Ordena | Secure Backend Mailing Setup](https://chatgpt.com/share/684af44c-a580-800f-9556-884a3a657321)
- [Ordena | Onboarding Progress Bar Setup](https://chatgpt.com/share/684af436-7888-800f-a539-2a06ffb521a0)
- [Ordena | Send email on register](https://chatgpt.com/share/684af423-4c04-800f-b6ea-b8ebe3e1176f)

---

## 👨‍💻 Auteur

**Karsten Verherstraeten**  
[GitHub Profiel](https://github.com/KarstenVerherstraeten)

---

## 📄 Licentie

De Laravel-framework is open-source software gelicentieerd onder de [MIT-licentie](https://opensource.org/licenses/MIT).
