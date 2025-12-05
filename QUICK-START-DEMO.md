# 🚀 Comandos Rápidos para Demo

## Iniciar Ambiente

### Opção 1: Script Automático (Recomendado)
```powershell
cd "C:\Users\Samsung\Desktop\Projetos\Sistema financeiro"
powershell -ExecutionPolicy Bypass -File .\preparar-demo.ps1
```

### Opção 2: Manual

#### Terminal 1 - Backend
```powershell
cd "C:\Users\Samsung\Desktop\Projetos\Sistema financeiro"
mvn spring-boot:run
```

#### Terminal 2 - Frontend (aguardar backend iniciar)
```powershell
cd "C:\Users\Samsung\Desktop\Projetos\Sistema financeiro\controle-financeiro"
npm start
```

#### Abrir Navegador
```powershell
start http://localhost:4200
```

---

## Limpar Banco (Opcional)

### MySQL Command Line
```sql
USE financeiro;
TRUNCATE TABLE transacao;
```

### OU PowerShell
```powershell
mysql -u root -pQ1w2e3r4@ -e "USE financeiro; TRUNCATE TABLE transacao;"
```

---

## Verificar Status

### Backend
```powershell
curl http://localhost:8080/api/transacoes
```

### Frontend
```powershell
curl http://localhost:4200
```

---

## Parar Serviços

### Parar Backend (Ctrl+C no terminal)

### OU Matar Processos
```powershell
# Backend
Get-Process java | Where-Object {$_.MainWindowTitle -match "spring-boot"} | Stop-Process

# Frontend
Get-Process node | Where-Object {$_.MainWindowTitle -match "Angular"} | Stop-Process
```

---

## Links Úteis

- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:8080
- **API Docs**: http://localhost:8080/api/transacoes

---

## Ferramentas de Gravação

### Download Links
- **ScreenToGif**: https://www.screentogif.com/downloads
- **Loom**: https://www.loom.com/download
- **ShareX**: https://getsharex.com/downloads
- **OBS Studio**: https://obsproject.com/download

---

## Atalhos de Teclado

- **F11** - Tela cheia no navegador
- **Ctrl+0** - Zoom 100%
- **Ctrl+Shift+I** - DevTools (para fechar se aberto)
- **F5** - Recarregar página

---

## Dados de Teste (Copy/Paste)

### Receita
```
Tipo: RECEITA
Descrição: Salário
Valor: 5000
```

### Despesas
```
Tipo: DESPESA | Categoria: Mercado | Descrição: Compras do mês | Valor: 800
Tipo: DESPESA | Categoria: Moradia | Descrição: Aluguel | Valor: 1500
Tipo: DESPESA | Categoria: Lazer | Descrição: Cinema | Valor: 100
Tipo: DESPESA | Categoria: Investimentos | Descrição: Aplicação | Valor: 1000
```

---

## Checklist Ultra-Rápido ⚡

```
[ ] MySQL rodando
[ ] Executar: preparar-demo.ps1
[ ] Abrir: http://localhost:4200
[ ] F11 (tela cheia)
[ ] Iniciar gravação
[ ] Seguir roteiro
[ ] Salvar em screenshots/demo.gif
```

---

**Pronto para gravar em 2 minutos! 🎬**
