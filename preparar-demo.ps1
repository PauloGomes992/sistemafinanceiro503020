# Script de preparacao para gravacao de demo

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PREPARACAO PARA GRAVACAO DE DEMO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$projectPath = "C:\Users\Samsung\Desktop\Projetos\Sistema financeiro"

# 1. Verificar se MySQL esta rodando
Write-Host "[1/5] Verificando MySQL..." -ForegroundColor Yellow
try {
    $mysqlProcess = Get-Process mysqld -ErrorAction SilentlyContinue
    if ($mysqlProcess) {
        Write-Host "     [OK] MySQL esta rodando" -ForegroundColor Green
    } else {
        Write-Host "     [AVISO] MySQL nao detectado" -ForegroundColor Yellow
        Write-Host "     Por favor, inicie o MySQL antes de continuar" -ForegroundColor Yellow
    }
} catch {
    Write-Host "     [AVISO] Nao foi possivel verificar MySQL" -ForegroundColor Yellow
}

# 2. Limpar banco de dados (opcional)
Write-Host "`n[2/5] Preparar banco de dados" -ForegroundColor Yellow
$limparBanco = Read-Host "     Deseja limpar o banco de dados? (S/N)"
if ($limparBanco -eq "S" -or $limparBanco -eq "s") {
    Write-Host "     Execute manualmente no MySQL:" -ForegroundColor Cyan
    Write-Host "     USE financeiro;" -ForegroundColor Gray
    Write-Host "     TRUNCATE TABLE transacao;" -ForegroundColor Gray
    Write-Host ""
    Read-Host "     Pressione ENTER apos executar"
}

# 3. Iniciar Backend
Write-Host "`n[3/5] Iniciando Backend Spring Boot..." -ForegroundColor Yellow
Write-Host "     Abrindo nova janela para o backend..." -ForegroundColor Gray

$backendScript = @"
cd '$projectPath'
Write-Host 'Iniciando Backend...' -ForegroundColor Green
mvn spring-boot:run
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

Write-Host "     Aguardando backend inicializar (20 segundos)..." -ForegroundColor Gray
Start-Sleep -Seconds 20

# 4. Verificar se backend esta respondendo
Write-Host "`n[4/5] Verificando Backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/transacoes" -Method GET -ErrorAction Stop
    Write-Host "     [OK] Backend respondendo na porta 8080" -ForegroundColor Green
} catch {
    Write-Host "     [ERRO] Backend nao esta respondendo" -ForegroundColor Red
    Write-Host "     Verifique a janela do backend" -ForegroundColor Yellow
    exit 1
}

# 5. Iniciar Frontend
Write-Host "`n[5/5] Iniciando Frontend Angular..." -ForegroundColor Yellow
Write-Host "     Abrindo nova janela para o frontend..." -ForegroundColor Gray

$frontendScript = @"
cd '$projectPath\controle-financeiro'
Write-Host 'Iniciando Frontend...' -ForegroundColor Green
npm start
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

Write-Host "     Aguardando frontend inicializar (15 segundos)..." -ForegroundColor Gray
Start-Sleep -Seconds 15

# Verificar frontend
Write-Host "`n[FINAL] Verificando Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4200" -Method GET -ErrorAction Stop -TimeoutSec 10
    Write-Host "     [OK] Frontend respondendo na porta 4200" -ForegroundColor Green
} catch {
    Write-Host "     [AVISO] Frontend ainda nao esta pronto" -ForegroundColor Yellow
    Write-Host "     Aguarde mais alguns segundos..." -ForegroundColor Yellow
}

# Abrir navegador
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "AMBIENTE PRONTO PARA GRAVACAO!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "URLs disponiveis:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:4200" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8080" -ForegroundColor White

Write-Host "`nFerramentas recomendadas para gravacao:" -ForegroundColor Cyan
Write-Host "  GIF:   ScreenToGif - https://www.screentogif.com/" -ForegroundColor White
Write-Host "  Video: Loom - https://www.loom.com/" -ForegroundColor White

$abrirNav = Read-Host "`nDeseja abrir o navegador agora? (S/N)"
if ($abrirNav -eq "S" -or $abrirNav -eq "s") {
    Start-Process "http://localhost:4200"
    Write-Host "`nNavegador aberto! Boa gravacao!" -ForegroundColor Green
}

Write-Host "`nDicas:" -ForegroundColor Yellow
Write-Host "  1. Pressione F11 para tela cheia" -ForegroundColor Gray
Write-Host "  2. Zoom 100% (Ctrl+0)" -ForegroundColor Gray
Write-Host "  3. Feche abas desnecessarias" -ForegroundColor Gray
Write-Host "  4. Consulte GUIA-GRAVACAO-DEMO.md para roteiro" -ForegroundColor Gray

Write-Host "`nPressione ENTER para sair..."
Read-Host
