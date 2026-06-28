param(
  [string]$RepoUrl = ""
)

Write-Host "Breń Garden - publikacja statycznej strony na GitHub" -ForegroundColor Green

if (-not (Test-Path "index.html")) {
  Write-Host "Uruchom skrypt w folderze, gdzie leży index.html" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

if ($RepoUrl -ne "") {
  $existing = git remote get-url origin 2>$null
  if ($LASTEXITCODE -ne 0) {
    git remote add origin $RepoUrl
  } else {
    git remote set-url origin $RepoUrl
  }
}

git add .
git commit -m "Publikacja strony Breń Garden" 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Brak nowych zmian do commita albo commit już istnieje." -ForegroundColor Yellow
}

git push -u origin main
Write-Host "Gotowe. Teraz włącz GitHub Pages: Settings -> Pages -> main / root" -ForegroundColor Green
