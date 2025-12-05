# 🎥 Guia para Gravação de Vídeo Demo

## 📋 Preparação

### 1. Ferramentas Recomendadas

#### Para GIF:
- **ScreenToGif** (Windows) - https://www.screentogif.com/
  - ✅ Gratuito
  - ✅ Leve e fácil de usar
  - ✅ Editor integrado
  - ✅ Exporta GIF otimizado

- **ShareX** (Windows) - https://getsharex.com/
  - ✅ Gratuito e open source
  - ✅ Captura de tela e GIF
  - ✅ Upload automático

#### Para Vídeo:
- **Loom** - https://www.loom.com/
  - ✅ Gratuito (até 5min)
  - ✅ Gravação fácil
  - ✅ Link compartilhável
  - ✅ Edição básica

- **OBS Studio** - https://obsproject.com/
  - ✅ Gratuito e profissional
  - ✅ Alta qualidade
  - ✅ Múltiplas configurações

### 2. Configuração do Ambiente

```powershell
# Terminal 1 - Backend
cd "C:\Users\Samsung\Desktop\Projetos\Sistema financeiro"
mvn spring-boot:run

# Terminal 2 - Frontend (após backend iniciar)
cd controle-financeiro
npm start
```

**Aguardar:**
- Backend: http://localhost:8080
- Frontend: http://localhost:4200

---

## 🎬 Roteiro de Gravação (2-3 minutos)

### Cena 1: Tela Inicial (5 segundos)
1. Abrir navegador em http://localhost:4200
2. Mostrar interface limpa e moderna
3. Destacar:
   - Header com seletor de mês
   - Formulário de transações
   - Lista vazia (se aplicável)

### Cena 2: Adicionar RECEITA (15 segundos)
1. Selecionar tipo: **RECEITA**
2. Preencher:
   - Descrição: `Salário`
   - Valor: `5000`
3. Clicar em **Salvar**
4. ✅ Mostrar mensagem de sucesso: "Transação salva com sucesso!"
5. Ver transação aparecer na lista

### Cena 3: Adicionar DESPESAS (30 segundos)

**Despesa 1 - Essencial:**
1. Tipo: **DESPESA**
2. Categoria: **Mercado** (Essenciais)
3. Descrição: `Compras do mês`
4. Valor: `800`
5. Salvar e ver mensagem de sucesso

**Despesa 2 - Essencial:**
1. Tipo: **DESPESA**
2. Categoria: **Moradia**
3. Descrição: `Aluguel`
4. Valor: `1500`
5. Salvar

**Despesa 3 - Não Essencial:**
1. Tipo: **DESPESA**
2. Categoria: **Lazer**
3. Descrição: `Cinema`
4. Valor: `100`
5. Salvar

**Despesa 4 - Enriquecer:**
1. Tipo: **DESPESA**
2. Categoria: **Investimentos**
3. Descrição: `Aplicação Mensal`
4. Valor: `1000`
5. Salvar

### Cena 4: Visualizar Gráficos (20 segundos)
1. **Scroll down** para os gráficos
2. Mostrar:
   - Gráfico de pizza por categoria
   - Gráfico de subcategorias (50/30/20)
   - Resumo com percentuais coloridos

3. **Destacar o alerta visual:**
   - Se alguma categoria ultrapassou o limite (fundo vermelho)
   - Explicação do método 50/30/20

### Cena 5: Editar Transação (15 segundos)
1. Clicar no botão **Editar** (✏️) em uma transação
2. Alterar valor ou descrição
3. Clicar em **Atualizar**
4. ✅ Mostrar mensagem: "Transação atualizada com sucesso!"
5. Ver atualização na lista e gráficos

### Cena 6: Excluir Transação (10 segundos)
1. Clicar no botão **Excluir** (🗑️)
2. Confirmar no diálogo: "Deseja realmente excluir esta transação?"
3. Clicar **OK**
4. ✅ Mostrar mensagem: "Transação excluída com sucesso!"
5. Ver transação removida

### Cena 7: Filtrar por Mês (10 segundos)
1. Clicar no **seletor de mês** no header
2. Selecionar mês anterior
3. Mostrar lista vazia ou com transações antigas
4. Voltar para mês atual
5. Ver todas as transações novamente

### Cena 8: Validações (15 segundos)
1. Tentar salvar transação **sem preencher campos**
2. Mostrar mensagens de erro em vermelho:
   - "Tipo é obrigatório"
   - "Descrição é obrigatória"
   - "Valor é obrigatório"
3. Preencher corretamente e salvar com sucesso

### Cena 9: Resumo Final (10 segundos)
1. Mostrar visão geral:
   - Lista completa de transações
   - Gráficos atualizados
   - Resumo 50/30/20 com cores
   - Card explicativo do método

---

## 🎨 Dicas de Gravação

### Visual:
- ✅ Use resolução **1920x1080** ou **1280x720**
- ✅ Zoom no navegador: **100%** (Ctrl+0)
- ✅ Feche abas desnecessárias
- ✅ Modo claro ou escuro (escolha o mais legível)
- ✅ Cursor destacado (se possível)

### Performance:
- ✅ GIF: Máximo **30 FPS**, duração **30-60 segundos**
- ✅ Vídeo: **60 FPS**, duração **2-3 minutos**
- ✅ Pause entre ações (1-2 segundos)
- ✅ Movimentos suaves do mouse

### Áudio (Loom):
- 🎤 Opcional: Narração explicando as funcionalidades
- 🎵 Opcional: Música de fundo suave

---

## 📦 Pós-Produção

### Para GIF (ScreenToGif):
1. Abrir o GIF no editor
2. Remover frames desnecessários
3. Reduzir FPS se necessário (15-20)
4. Adicionar texto/anotações (opcional)
5. Otimizar tamanho (< 10MB para GitHub)
6. Exportar como GIF

### Para Vídeo (Loom):
1. Revisar gravação
2. Cortar início/fim desnecessários
3. Adicionar call-to-action no final
4. Copiar link compartilhável
5. Salvar também como MP4 (backup)

---

## 📂 Onde Salvar

### GIF:
```
Sistema financeiro/
├── screenshots/
│   └── demo.gif          # <= Colocar aqui
├── README.md
```

### Loom:
1. Copiar link do vídeo
2. Adicionar no README.md:
```markdown
## 🎥 Demonstração

![Demo em Vídeo](https://www.loom.com/share/SEU-LINK-AQUI)

Ou GIF:
![Demo GIF](./screenshots/demo.gif)
```

---

## 🚀 Checklist Final

Antes de gravar:
- [ ] Backend rodando (porta 8080)
- [ ] Frontend rodando (porta 4200)
- [ ] Banco de dados limpo ou com poucos dados
- [ ] Navegador em tela cheia (F11)
- [ ] Fechar notificações do Windows
- [ ] Testar todos os fluxos manualmente

Durante a gravação:
- [ ] Movimentos lentos e deliberados
- [ ] Pause entre ações
- [ ] Mostrar mensagens de feedback
- [ ] Destacar funcionalidades principais

Após a gravação:
- [ ] Revisar qualidade
- [ ] Otimizar tamanho
- [ ] Testar reprodução
- [ ] Adicionar ao README.md

---

## 📝 Template para README.md

```markdown
## 🎥 Demonstração

### Vídeo Completo
[![Assista ao vídeo demo](https://img.shields.io/badge/▶️-Assistir%20Demo-red?style=for-the-badge)](https://www.loom.com/share/SEU-LINK)

### GIF Preview
![Sistema Financeiro Demo](./screenshots/demo.gif)

### ✨ Funcionalidades Demonstradas:
- ✅ Adicionar receitas e despesas
- ✅ Categorização automática (50/30/20)
- ✅ Visualização em gráficos interativos
- ✅ Edição e exclusão de transações
- ✅ Filtro por mês
- ✅ Alertas visuais para gastos excessivos
- ✅ Mensagens de feedback em tempo real
```

---

## 🎯 Exemplo de Sequência Rápida (30s GIF)

**Para GIF curto no GitHub:**

1. **0-5s**: Tela inicial + adicionar receita de R$ 5000
2. **5-10s**: Adicionar 2 despesas rápidas
3. **10-15s**: Scroll para mostrar gráficos
4. **15-20s**: Editar uma transação
5. **20-25s**: Excluir uma transação
6. **25-30s**: Mostrar resumo 50/30/20 com cores

**FPS recomendado:** 15-20
**Tamanho esperado:** 5-8 MB

---

**Boa gravação! 🎬✨**
