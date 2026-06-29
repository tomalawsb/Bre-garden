# publish_to_github.ps1
# Uruchamiaj z glownego folderu strony, tam gdzie jest index.html.
# Jezeli repo nie ma remote origin, wpisz adres w zmiennej RepoUrl.

$ErrorActionPreference = 'Stop'

$RepoUrl = ''

function Run-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$ArgsList
    )

    & git @ArgsList
    if ($LASTEXITCODE -ne 0) {
        throw ('Blad Git: git ' + ($ArgsList -join ' '))
    }
}

if (-not (Test-Path -LiteralPath 'index.html')) {
    throw 'Brak index.html. Uruchom skrypt z glownego folderu strony.'
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Nie znaleziono Git. Zainstaluj Git for Windows.'
}

if (-not (Test-Path -LiteralPath '.git')) {
    Run-Git @('init')
}

$remote = ''
try {
    $remote = (& git remote get-url origin 2>$null).Trim()
} catch {
    $remote = ''
}

if ([string]::IsNullOrWhiteSpace($remote)) {
    if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
        throw 'Brak remote origin. Wpisz adres repozytorium w zmiennej RepoUrl albo uruchom: git remote add origin ADRES_REPO'
    }
    Run-Git @('remote', 'add', 'origin', $RepoUrl)
}

Run-Git @('branch', '-M', 'main')
Run-Git @('add', '.')

$changes = (& git status --porcelain)
if (-not [string]::IsNullOrWhiteSpace($changes)) {
    Run-Git @('commit', '-m', 'Publikacja strony Bren Garden')
} else {
    Write-Host 'Brak zmian do zapisania w commit.' -ForegroundColor Yellow
}

Run-Git @('push', '-u', 'origin', 'main')

Write-Host 'Gotowe. Ustaw GitHub Pages: Settings -> Pages -> main -> root.' -ForegroundColor Green
