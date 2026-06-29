BREŃ GARDEN — GOTOWA STRONA STATYCZNA

Zawartość paczki:
- index.html — strona główna,
- przewodnik-qr.html — przykładowa karta przewodnika QR,
- css/style.css — wygląd strony,
- js/app.js — menu mobilne i galeria,
- assets/img — zdjęcia,
- robots.txt i sitemap.xml — podstawowe pliki SEO,
- publish_to_github.ps1 — skrypt wysyłania na GitHub.

Jak opublikować na GitHub Pages:
1. Rozpakuj ZIP do pustego folderu.
2. Otwórz PowerShell w tym folderze.
3. Uruchom:
   ./publish_to_github.ps1
4. W GitHub ustaw Pages: Deploy from branch -> main -> /root.

Jeżeli Git pokaże brak remote origin:
- otwórz publish_to_github.ps1,
- w zmiennej $RepoUrl wpisz adres repozytorium,
- uruchom skrypt ponownie.

Przed ostateczną publikacją warto uzupełnić:
- numer telefonu, jeżeli właściciel chce go pokazać,
- godziny otwarcia,
- cennik albo informację o wycenie indywidualnej,
- dokładny adres/pinezka Google Maps,
- finalny adres domeny w index.html, przewodnik-qr.html, robots.txt i sitemap.xml.

W tej wersji poprawiono:
- normalną typografię bez krzyczących wielkich liter,
- nagłówki bez kropek na końcu,
- mniejsze i czytelniejsze tytuły,
- bardziej naturalne teksty sekcji,
- pliki SEO: robots.txt, sitemap.xml, canonical i Open Graph,
- obrazy z width/height oraz alt,
- galerię widoczną w HTML,
- przyciski type="button",
- focus-visible i podstawową dostępność,
- bezpieczniejszy publish_to_github.ps1.
