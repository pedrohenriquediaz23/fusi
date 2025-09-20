// Backend Example for Real OAuth Implementation
// This is a Node.js/Express example for handling OAuth

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Discord OAuth Configuration
const DISCORD_CLIENT_ID = 'your-discord-client-id';
const DISCORD_CLIENT_SECRET = 'your-discord-client-secret';
const DISCORD_REDIRECT_URI = 'http://localhost:8000/auth/discord/callback';

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = 'your-google-client-id';
const GOOGLE_CLIENT_SECRET = 'your-google-client-secret';
const GOOGLE_REDIRECT_URI = 'http://localhost:8000/auth/google/callback';

// Discord OAuth Token Exchange
app.post('/api/auth/discord/token', async (req, res) => {
    try {
        const { code } = req.body;
        
        // Exchange code for access token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', {
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: DISCORD_REDIRECT_URI
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const { access_token } = tokenResponse.data;
        
        // Get user info from Discord
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        const userData = userResponse.data;
        
        res.json({
            success: true,
            user: {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                avatar: userData.avatar
            }
        });
        
    } catch (error) {
        console.error('Discord OAuth Error:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to authenticate with Discord'
        });
    }
});

// Google OAuth Token Exchange
app.post('/api/auth/google/token', async (req, res) => {
    try {
        const { code } = req.body;
        
        // Exchange code for access token
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: GOOGLE_REDIRECT_URI
        });
        
        const { access_token } = tokenResponse.data;
        
        // Get user info from Google
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        const userData = userResponse.data;
        
        res.json({
            success: true,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                picture: userData.picture
            }
        });
        
    } catch (error) {
        console.error('Google OAuth Error:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to authenticate with Google'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

// To run this backend:
// 1. npm init -y
// 2. npm install express axios cors
// 3. node backend-example.js
// 4. Update oauth-config.js with your real Client IDs
