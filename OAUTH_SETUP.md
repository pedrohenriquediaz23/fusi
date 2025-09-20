# 🔐 Configuração OAuth - Discord e Google

Este guia explica como configurar a autenticação OAuth com Discord e Google para o sistema de login.

## 📋 Pré-requisitos

- Conta no Discord Developer Portal
- Conta no Google Cloud Console
- Servidor web rodando (para callbacks)

## 🎮 Configuração Discord OAuth

### 1. Criar Aplicação Discord

1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome para sua aplicação (ex: "Fusion Cloud Games")
4. Clique em "Create"

### 2. Configurar OAuth2

1. No painel da aplicação, vá para "OAuth2" > "General"
2. Copie o **Client ID**
3. Em "Redirects", adicione:
   ```
   http://localhost:8000/auth/discord/callback
   https://seudominio.com/auth/discord/callback
   ```
4. Em "Scopes", selecione:
   - `identify`
   - `email`

### 3. Atualizar Configuração

Edite o arquivo `oauth-config.js`:

```javascript
discord: {
    clientId: '1418784916136529950', // Substitua pelo Client ID
    redirectUri: window.location.origin + '/auth/discord/callback',
    scope: 'identify email',
    authUrl: 'https://discord.com/api/oauth2/authorize'
}
```

## 🔍 Configuração Google OAuth

### 1. Criar Projeto Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google+ API**

### 2. Configurar OAuth2

1. Vá para "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
3. Selecione "Web application"
4. Em "Authorized redirect URIs", adicione:
   ```
   http://localhost:8000/auth/google/callback
   https://seudominio.com/auth/google/callback
   ```
5. Copie o **Client ID**

### 3. Atualizar Configuração

Edite o arquivo `oauth-config.js`:

```javascript
google: {
    clientId: 'SEU_GOOGLE_CLIENT_ID_AQUI', // Substitua pelo Client ID
    redirectUri: window.location.origin + '/auth/google/callback',
    scope: 'openid email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
}
```

## 🚀 Testando a Configuração

### 1. Servidor Local

```bash
# Inicie o servidor
python -m http.server 8000

# Acesse
http://localhost:8000
```

### 2. Teste de Login

1. Clique em "Começar Agora"
2. Teste o login com Discord
3. Teste o login com Google
4. Verifique se os dados do usuário são recebidos

## 🔧 Configuração de Produção

### 1. Domínio Personalizado

1. Configure seu domínio no servidor
2. Atualize as URLs de callback nos painéis OAuth
3. Atualize o `oauth-config.js` com o domínio correto

### 2. Backend (Opcional)

Para produção, implemente um backend para:
- Trocar códigos por tokens de acesso
- Validar tokens
- Armazenar dados do usuário
- Gerenciar sessões

## 🛠️ Estrutura de Arquivos

```
/
├── index.html
├── script.js
├── styles.css
├── oauth-config.js
├── auth/
│   ├── discord/
│   │   └── callback.html
│   └── google/
│       └── callback.html
└── OAUTH_SETUP.md
```

## ⚠️ Notas Importantes

- **Nunca** commite Client IDs ou Secrets no código
- Use variáveis de ambiente em produção
- Configure HTTPS em produção
- Teste todas as funcionalidades antes de fazer deploy

## 🆘 Solução de Problemas

### Erro: "Invalid redirect URI"
- Verifique se a URL de callback está correta nos painéis OAuth
- Certifique-se de que o protocolo (http/https) está correto

### Erro: "Client ID not found"
- Verifique se o Client ID está correto no `oauth-config.js`
- Certifique-se de que a aplicação OAuth está ativa

### Popup bloqueado
- Configure o navegador para permitir popups do seu domínio
- Teste em modo incógnito se necessário

## 📞 Suporte

Para dúvidas sobre OAuth:
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
