# SEC::ACADEMY - Otomatik baslatmayi KALDIRIR
# Baslangic klasorundeki kisayolu siler. Baska hicbir seye dokunmaz.

$startup = [Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup 'SEC-Academy.lnk'

if (Test-Path $lnkPath) {
    Remove-Item $lnkPath -Force
    Write-Host "[OK] Otomatik baslatma KALDIRILDI." -ForegroundColor Yellow
    Write-Host "     Site artik bilgisayar acilinca otomatik baslamayacak."
} else {
    Write-Host "Kisayol zaten yok, yapacak bir sey yok."
}
