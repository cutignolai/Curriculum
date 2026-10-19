# Genera los CV en PDF (español e inglés) a partir de cv-print.html y cv-print-english.html.
# Uso: abrir PowerShell en la carpeta del proyecto y ejecutar .\generar-pdf.ps1

$browsers = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)
$browser = $browsers | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) {
  Write-Error "No se encontró Chrome ni Edge."
  exit 1
}

$root = $PSScriptRoot
$jobs = @(
  @{ Html = "cv-print.html"; Pdf = "Ignacio-Cutignola-CV-ES.pdf" },
  @{ Html = "cv-print-english.html"; Pdf = "Ignacio-Cutignola-Resume-EN.pdf" }
)

foreach ($job in $jobs) {
  $source = "file:///" + ((Join-Path $root $job.Html) -replace "\\", "/")
  $target = Join-Path $root $job.Pdf
  & $browser --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 `
    "--print-to-pdf=$target" $source | Out-Null
  Write-Output "Generado: $($job.Pdf)"
}
