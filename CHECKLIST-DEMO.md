# ✅ Checklist de Gravação de Demo

## 📋 Preparação Rápida

### 1. Instalar Ferramenta (escolha uma)
- [ ] **ScreenToGif** - https://www.screentogif.com/ (Recomendado para GIF)
- [ ] **Loom** - https://www.loom.com/ (Recomendado para vídeo)
- [ ] **ShareX** - https://getsharex.com/ (Alternativa)
- [ ] **OBS Studio** - https://obsproject.com/ (Profissional)

### 2. Preparar Ambiente
- [ ] MySQL rodando
- [ ] Executar `preparar-demo.ps1` OU:
  - [ ] Backend rodando (porta 8080)
  - [ ] Frontend rodando (porta 4200)
- [ ] Abrir http://localhost:4200 no navegador
- [ ] Pressionar **F11** (tela cheia)
- [ ] **Ctrl+0** (zoom 100%)
- [ ] Fechar outras abas/notificações

### 3. Dados de Teste Prontos
Copie e cole durante a gravação:

**Receita:**
- Tipo: RECEITA
- Descrição: `Salário`
- Valor: `5000`

**Despesa 1:**
- Tipo: DESPESA
- Categoria: Mercado
- Descrição: `Compras do mês`
- Valor: `800`

**Despesa 2:**
- Tipo: DESPESA
- Categoria: Moradia
- Descrição: `Aluguel`
- Valor: `1500`

**Despesa 3:**
- Tipo: DESPESA
- Categoria: Lazer
- Descrição: `Cinema`
- Valor: `100`

**Despesa 4:**
- Tipo: DESPESA
- Categoria: Investimentos
- Descrição: `Aplicação`
- Valor: `1000`

---

## 🎬 Roteiro Simplificado (30-60s)

### Para GIF curto (30s):
1. **5s** - Tela inicial
2. **10s** - Adicionar 1 receita + 2 despesas rápido
3. **5s** - Scroll para gráficos
4. **5s** - Editar transação
5. **5s** - Excluir transação

### Para Vídeo completo (2-3min):
1. **10s** - Tela inicial + navegação
2. **30s** - Adicionar receita e 4 despesas
3. **20s** - Mostrar gráficos e alertas
4. **15s** - Editar transação
5. **10s** - Excluir transação
6. **10s** - Filtrar por mês
7. **15s** - Testar validações
8. **10s** - Resumo final

---

## 🎥 Durante a Gravação

- [ ] Movimentos lentos e suaves
- [ ] Pause 1-2s entre ações
- [ ] Aguarde mensagens de feedback aparecerem
- [ ] Não clique muito rápido
- [ ] Evite erros de digitação

---

## 🔧 Pós-Gravação

### Para GIF (ScreenToGif):
- [ ] Abrir no editor
- [ ] Remover frames iniciais/finais ruins
- [ ] Reduzir FPS para 15-20 se necessário
- [ ] Otimizar (File > Export > Optimize)
- [ ] Salvar como `demo.gif` na pasta `screenshots/`
- [ ] Verificar tamanho (< 10MB)

### Para Vídeo (Loom):
- [ ] Revisar gravação
- [ ] Cortar pontas
- [ ] Copiar link compartilhável
- [ ] Atualizar README.md com o link
- [ ] (Opcional) Baixar MP4 como backup

---

## 📤 Publicar

- [ ] Mover `demo.gif` para `screenshots/`
- [ ] Atualizar link do Loom no README.md (se aplicável)
- [ ] Testar visualização no GitHub
- [ ] Commit e push
- [ ] Verificar no repositório remoto

---

## 🆘 Troubleshooting

**Problema**: Backend não inicia
- ✅ Verificar se MySQL está rodando
- ✅ Verificar credenciais no `application.properties`

**Problema**: Frontend não carrega
- ✅ Executar `npm install` novamente
- ✅ Verificar porta 4200 não está em uso

**Problema**: GIF muito grande (> 10MB)
- ✅ Reduzir FPS para 12-15
- ✅ Reduzir resolução para 1280x720
- ✅ Encurtar duração para 20-30s
- ✅ Usar otimização no ScreenToGif

**Problema**: Loom não grava
- ✅ Permitir acesso à tela/câmera
- ✅ Usar navegador Chrome/Edge
- ✅ Testar gravação de teste antes

---

**Boa gravação! 🎬✨**

Dúvidas? Consulte `GUIA-GRAVACAO-DEMO.md` para detalhes completos.
