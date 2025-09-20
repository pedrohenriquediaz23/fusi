// OAuth Configuration
// Configure your Discord and Google OAuth applications here

const OAUTH_CONFIG = {
    // Discord OAuth Configuration
    discord: {
        clientId: '1234567890123456789', // Replace with your real Discord Client ID
        redirectUri: window.location.origin + '/auth/discord/callback',
        scope: 'identify email',
        authUrl: 'https://discord.com/api/oauth2/authorize',
        demoMode: false // Real OAuth mode
    },
    
    // Google OAuth Configuration
    google: {
        clientId: 'your-google-client-id.apps.googleusercontent.com', // Replace with your real Google Client ID
        redirectUri: window.location.origin + '/auth/google/callback',
        scope: 'openid email profile',
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        demoMode: false // Real OAuth mode
    }
};

// Helper function to build OAuth URLs
function buildOAuthUrl(provider) {
    const config = OAUTH_CONFIG[provider];
    if (!config) return null;
    
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        scope: config.scope,
        access_type: provider === 'google' ? 'offline' : undefined
    });
    
    return `${config.authUrl}?${params.toString()}`;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OAUTH_CONFIG, buildOAuthUrl };
}
