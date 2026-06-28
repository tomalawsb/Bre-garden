# publish_to_github.ps1
# Uruchamiaj z głównego folderu strony, tam gdzie jest index.html.
# Przed pierwszym użyciem ustaw poprawny adres repozytorium w zmiennej $RepoUrl.

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/TWOJ_LOGIN/bren-garden.git"

if (-not (Test-Path "index.html")) {
    throw "Brak index.html. Uruchom skrypt z głównego folderu strony."
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Nie znaleziono Git. Zainstaluj Git for Windows."
}

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

$remote = git remote get-url origin 2>$null
if (-not $remote) {
    git remote add origin $RepoUrl
}

 git add .
 git commit -m "Publikacja strony Breń Garden" 2>$null
 git push -u origin main

Write-Host "Gotowe. Teraz w GitHub ustaw Settings -> Pages -> main -> /root." -ForegroundColor Green
