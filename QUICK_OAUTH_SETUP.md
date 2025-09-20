# 🚀 Configuração Rápida OAuth Real

## ⚡ **Configuração Discord (5 minutos)**

### 1. Criar App Discord:
1. Acesse: https://discord.com/developers/applications
2. Clique "New Application"
3. Nome: "Fusion Cloud Games"
4. Clique "Create"

### 2. Configurar OAuth2:
1. Vá para "OAuth2" > "General"
2. **Copie o Client ID**
3. Em "Redirects", adicione:
   ```
   http://localhost:8000/auth/discord/callback
   ```
4. Scopes: `identify` e `email`

### 3. Atualizar Código:
```javascript
// Em oauth-config.js, linha 7:
clientId: 'SEU_CLIENT_ID_DISCORD_AQUI',
```

## ⚡ **Configuração Google (5 minutos)**

### 1. Criar Projeto Google:
1. Acesse: https://console.cloud.google.com/
2. "Create Project" ou selecione existente
3. Ative "Google+ API"

### 2. Configurar OAuth2:
1. "APIs & Services" > "Credentials"
2. "Create Credentials" > "OAuth 2.0 Client IDs"
3. Tipo: "Web application"
4. Redirect URIs:
   ```
   http://localhost:8000/auth/google/callback
   ```
5. **Copie o Client ID**

### 3. Atualizar Código:
```javascript
// Em oauth-config.js, linha 16:
clientId: 'SEU_CLIENT_ID_GOOGLE_AQUI',
```

## 🔧 **Teste Rápido:**

1. **Atualize** os Client IDs no `oauth-config.js`
2. **Reinicie** o servidor: `python -m http.server 8000`
3. **Teste**: Clique "Começar Agora" > Discord/Google
4. **Login**: Use suas contas reais

## ⚠️ **Importante:**

- **Discord**: Precisa de Client ID válido
- **Google**: Precisa de Client ID válido
- **URLs**: Deve ser `http://localhost:8000` para teste local
- **HTTPS**: Necessário em produção

## 🎯 **Resultado:**

✅ Login real com Discord
✅ Login real com Google  
✅ Dados reais do usuário
✅ Interface responsiva
✅ Funcionalidades completas

**Tempo total: ~10 minutos** 🚀
