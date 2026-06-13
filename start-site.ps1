# SEC::ACADEMY - Otomatik başlatma scripti
# Bilgisayar açıldığında dev sunucusunu başlatır ve tarayıcıyı açar.
# Bu dosya bulunduğu klasörü baz alır ($PSScriptRoot) — kişisel yol içermez.

Set-Location -LiteralPath $PSScriptRoot

# Node/npm'in bulunması için PATH'i tazele
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

# Dev sunucusunu küçültülmüş pencerede arka planda başlat
Start-Process -FilePath 'cmd.exe' -ArgumentList '/c','npm run dev' -WorkingDirectory $PSScriptRoot -WindowStyle Minimized

# Sunucu hazır olana kadar bekle, sonra tarayıcıda aç
Start-Sleep -Seconds 9
Start-Process 'http://localhost:3000'
