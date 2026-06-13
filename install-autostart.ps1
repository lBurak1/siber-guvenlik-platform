# SEC::ACADEMY - Otomatik baslatmayi KURAR
# Windows baslangic klasorune, start-site.ps1'i calistiran bir kisayol ekler.
# GUVENLIK: .env veya hicbir hassas dosyaya DOKUNMAZ. Sadece bir .lnk olusturur.
# Kisisel yol icermez -> $PSScriptRoot ile dinamik calisir.

$projectDir = $PSScriptRoot
$scriptPath = Join-Path $projectDir 'start-site.ps1'

if (-not (Test-Path $scriptPath)) {
    Write-Host "[HATA] start-site.ps1 bulunamadi: $scriptPath" -ForegroundColor Red
    exit 1
}

$startup = [Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup 'SEC-Academy.lnk'

$ws = New-Object -ComObject WScript.Shell
$sc = $ws.CreateShortcut($lnkPath)
$sc.TargetPath      = 'powershell.exe'
$sc.Arguments       = "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
$sc.WorkingDirectory = $projectDir
$sc.WindowStyle     = 7        # 7 = kucultulmus (minimized)
$sc.Description     = 'SEC Academy egitim sitesini baslat'
$sc.Save()

Write-Host ""
Write-Host "[OK] Otomatik baslatma KURULDU." -ForegroundColor Green
Write-Host "     Kisayol: $lnkPath"
Write-Host ""
Write-Host "Bilgisayar her acildiginda site otomatik baslayacak ve"
Write-Host "tarayicida http://localhost:3000 acilacak."
Write-Host ""
Write-Host "Kaldirmak istersen: uninstall-autostart.ps1 dosyasini calistir."
