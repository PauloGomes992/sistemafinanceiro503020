# Testes End-to-End - Sistema Financeiro

Write-Host "`n========================================"
Write-Host "TESTES E2E - SISTEMA FINANCEIRO"
Write-Host "========================================`n"

$baseUrl = "http://localhost:8080/api"
$testsPassed = 0
$testsFailed = 0

function Show-TestResult {
    param (
        [string]$TestName,
        [bool]$Success,
        [string]$Message = ""
    )
    
    if ($Success) {
        Write-Host "[OK] $TestName" -ForegroundColor Green
        if ($Message) { Write-Host "     $Message" -ForegroundColor Gray }
        $script:testsPassed++
    } else {
        Write-Host "[FALHOU] $TestName" -ForegroundColor Red
        if ($Message) { Write-Host "     $Message" -ForegroundColor Yellow }
        $script:testsFailed++
    }
}

# 1. TESTE DE CONECTIVIDADE
Write-Host "`n[1] Testando conectividade com backend..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/transacoes" -Method GET -ErrorAction Stop
    Show-TestResult "Backend esta respondendo" $true "Status Code: $($response.StatusCode)"
} catch {
    Show-TestResult "Backend esta respondendo" $false "Erro: $_"
    Write-Host "`nBackend nao esta rodando. Encerrando testes." -ForegroundColor Red
    exit 1
}

# 2. TESTE GET - LISTAR CATEGORIAS
Write-Host "`n[2] Testando GET /api/transacoes/categorias..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/transacoes/categorias" -Method GET
    $categoriasCount = $response.Count
    
    if ($categoriasCount -gt 0) {
        Show-TestResult "Listar categorias" $true "Total de categorias: $categoriasCount"
        Write-Host "     Categorias: $($response.descricao -join ', ')" -ForegroundColor Gray
    } else {
        Show-TestResult "Listar categorias" $false "Nenhuma categoria retornada"
    }
} catch {
    Show-TestResult "Listar categorias" $false "Erro: $_"
}

# 3. TESTE GET - LISTAR TRANSACOES
Write-Host "`n[3] Testando GET /api/transacoes..." -ForegroundColor Yellow

try {
    $transacoes = Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method GET
    $transacoesCount = $transacoes.Count
    
    Show-TestResult "Listar todas transacoes" $true "Total de transacoes: $transacoesCount"
    
    if ($transacoesCount -gt 0) {
        Write-Host "     Primeira transacao:" -ForegroundColor Gray
        Write-Host "     - ID: $($transacoes[0].id)" -ForegroundColor Gray
        Write-Host "     - Descricao: $($transacoes[0].descricao)" -ForegroundColor Gray
        Write-Host "     - Valor: R$ $($transacoes[0].valor)" -ForegroundColor Gray
        Write-Host "     - Tipo: $($transacoes[0].tipo)" -ForegroundColor Gray
    }
} catch {
    Show-TestResult "Listar todas transacoes" $false "Erro: $_"
}

# 4. TESTE POST - CRIAR NOVA TRANSACAO
Write-Host "`n[4] Testando POST /api/transacoes..." -ForegroundColor Yellow

$novaTransacao = @{
    descricao = "Teste E2E - Salario"
    valor = 5000.00
    tipo = "RECEITA"
    data = (Get-Date -Format "yyyy-MM-dd")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method POST -Body $novaTransacao -ContentType "application/json"
    
    if ($response.id -and $response.descricao -eq "Teste E2E - Salario") {
        Show-TestResult "Criar nova transacao (RECEITA)" $true "ID criado: $($response.id)"
        $script:receitaId = $response.id
        Write-Host "     Transacao criada: $($response.descricao) - R$ $($response.valor)" -ForegroundColor Gray
    } else {
        Show-TestResult "Criar nova transacao (RECEITA)" $false "Resposta invalida"
    }
} catch {
    Show-TestResult "Criar nova transacao (RECEITA)" $false "Erro: $_"
}

# Criar uma DESPESA
$despesa = @{
    descricao = "Teste E2E - Mercado"
    valor = 350.00
    tipo = "DESPESA"
    categoria = "MERCADO"
    data = (Get-Date -Format "yyyy-MM-dd")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method POST -Body $despesa -ContentType "application/json"
    
    if ($response.id -and $response.categoria -eq "MERCADO") {
        Show-TestResult "Criar nova transacao (DESPESA)" $true "ID criado: $($response.id)"
        $script:despesaId = $response.id
        Write-Host "     Transacao criada: $($response.descricao) - R$ $($response.valor) - $($response.categoria)" -ForegroundColor Gray
    } else {
        Show-TestResult "Criar nova transacao (DESPESA)" $false "Resposta invalida"
    }
} catch {
    Show-TestResult "Criar nova transacao (DESPESA)" $false "Erro: $_"
}

# 5. TESTE GET BY ID
Write-Host "`n[5] Testando GET /api/transacoes/{id}..." -ForegroundColor Yellow

if ($receitaId) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/transacoes/$receitaId" -Method GET
        
        if ($response.id -eq $receitaId) {
            Show-TestResult "Buscar transacao por ID" $true "Transacao encontrada: $($response.descricao)"
        } else {
            Show-TestResult "Buscar transacao por ID" $false "ID nao corresponde"
        }
    } catch {
        Show-TestResult "Buscar transacao por ID" $false "Erro: $_"
    }
}

# 6. TESTE PUT - ATUALIZAR TRANSACAO
Write-Host "`n[6] Testando PUT /api/transacoes/{id}..." -ForegroundColor Yellow

if ($despesaId) {
    $transacaoAtualizada = @{
        descricao = "Teste E2E - Mercado ATUALIZADO"
        valor = 450.00
        tipo = "DESPESA"
        categoria = "MERCADO"
        data = (Get-Date -Format "yyyy-MM-dd")
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/transacoes/$despesaId" -Method PUT -Body $transacaoAtualizada -ContentType "application/json"
        
        if ($response.descricao -eq "Teste E2E - Mercado ATUALIZADO" -and $response.valor -eq 450.00) {
            Show-TestResult "Atualizar transacao" $true "Transacao atualizada com sucesso"
            Write-Host "     Nova descricao: $($response.descricao)" -ForegroundColor Gray
            Write-Host "     Novo valor: R$ $($response.valor)" -ForegroundColor Gray
        } else {
            Show-TestResult "Atualizar transacao" $false "Dados nao atualizados corretamente"
        }
    } catch {
        Show-TestResult "Atualizar transacao" $false "Erro: $_"
    }
}

# 7. TESTE DELETE
Write-Host "`n[7] Testando DELETE /api/transacoes/{id}..." -ForegroundColor Yellow

if ($receitaId) {
    try {
        Invoke-RestMethod -Uri "$baseUrl/transacoes/$receitaId" -Method DELETE
        Show-TestResult "Excluir transacao (RECEITA)" $true "Transacao ID $receitaId excluida"
        
        # Verificar se foi realmente excluida
        try {
            Invoke-RestMethod -Uri "$baseUrl/transacoes/$receitaId" -Method GET
            Show-TestResult "Verificar exclusao" $false "Transacao ainda existe"
        } catch {
            Show-TestResult "Verificar exclusao" $true "Transacao nao existe mais (404 esperado)"
        }
    } catch {
        Show-TestResult "Excluir transacao (RECEITA)" $false "Erro: $_"
    }
}

if ($despesaId) {
    try {
        Invoke-RestMethod -Uri "$baseUrl/transacoes/$despesaId" -Method DELETE
        Show-TestResult "Excluir transacao (DESPESA)" $true "Transacao ID $despesaId excluida"
    } catch {
        Show-TestResult "Excluir transacao (DESPESA)" $false "Erro: $_"
    }
}

# 8. TESTE DE VALIDACAO
Write-Host "`n[8] Testando validacoes..." -ForegroundColor Yellow

# Tentar criar transacao sem descricao
$transacaoInvalida = @{
    valor = 100.00
    tipo = "RECEITA"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method POST -Body $transacaoInvalida -ContentType "application/json"
    Show-TestResult "Validacao: descricao obrigatoria" $false "Aceitou transacao sem descricao"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Show-TestResult "Validacao: descricao obrigatoria" $true "Retornou 400 Bad Request (esperado)"
    } else {
        Show-TestResult "Validacao: descricao obrigatoria" $false "Erro inesperado: $_"
    }
}

# Tentar criar transacao com valor negativo
$transacaoValorNegativo = @{
    descricao = "Teste negativo"
    valor = -100.00
    tipo = "DESPESA"
    categoria = "OUTROS"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method POST -Body $transacaoValorNegativo -ContentType "application/json"
    Show-TestResult "Validacao: valor positivo" $false "Aceitou valor negativo"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Show-TestResult "Validacao: valor positivo" $true "Retornou 400 Bad Request (esperado)"
    } else {
        Show-TestResult "Validacao: valor positivo" $false "Erro inesperado: $_"
    }
}

# 9. TESTE DE PERFORMANCE
Write-Host "`n[9] Testando performance..." -ForegroundColor Yellow

$startTime = Get-Date
try {
    1..10 | ForEach-Object {
        Invoke-RestMethod -Uri "$baseUrl/transacoes" -Method GET | Out-Null
    }
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalMilliseconds
    $avgTime = $duration / 10
    
    if ($avgTime -lt 500) {
        Show-TestResult "Performance: 10 requisicoes GET" $true "Tempo medio: $([math]::Round($avgTime, 2))ms"
    } else {
        Show-TestResult "Performance: 10 requisicoes GET" $false "Tempo medio muito alto: $([math]::Round($avgTime, 2))ms"
    }
} catch {
    Show-TestResult "Performance: 10 requisicoes GET" $false "Erro: $_"
}

# RELATORIO FINAL
Write-Host "`n========================================"
Write-Host "RELATORIO FINAL"
Write-Host "========================================"

$totalTests = $testsPassed + $testsFailed
$successRate = if ($totalTests -gt 0) { [math]::Round(($testsPassed / $totalTests) * 100, 2) } else { 0 }

Write-Host "`n[OK] Testes Passou: $testsPassed" -ForegroundColor Green
Write-Host "[X] Testes Falhou: $testsFailed" -ForegroundColor Red
Write-Host "[#] Total de Testes: $totalTests" -ForegroundColor Cyan
Write-Host "[%] Taxa de Sucesso: $successRate%" -ForegroundColor $(if ($successRate -ge 80) { "Green" } elseif ($successRate -ge 50) { "Yellow" } else { "Red" })

Write-Host "`n========================================`n"

if ($testsFailed -eq 0) {
    Write-Host "TODOS OS TESTES PASSARAM!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "ALGUNS TESTES FALHARAM" -ForegroundColor Yellow
    exit 1
}
