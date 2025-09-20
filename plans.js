// Plans Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginState();
    
    // Load user's current plan
    loadUserPlan();
    
    // Initialize plan actions
    initializePlanActions();
});

function loadUserPlan() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    
    if (!userEmail) {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
        return;
    }
    
    // Simulate user plan data (in real app, this would come from API)
    const userPlan = getUserPlanData(userEmail);
    
    // Update plan information
    document.getElementById('current-plan-name').textContent = userPlan.name;
    document.getElementById('current-plan-price').textContent = userPlan.price;
    document.getElementById('plan-status').textContent = userPlan.status;
    document.getElementById('next-billing').textContent = userPlan.nextBilling;
}

function getUserPlanData(email) {
    // Simulate different plans based on user
    const plans = {
        'admin@admin.com': {
            name: 'Plano Administrador',
            price: 'R$ 0,00',
            status: 'Ativo',
            nextBilling: 'N/A'
        },
        'default': {
            name: 'Plano Básico',
            price: 'R$ 29,90',
            status: 'Ativo',
            nextBilling: '15/02/2025'
        }
    };
    
    return plans[email] || plans['default'];
}

function initializePlanActions() {
    // Plan action buttons are handled by onclick attributes in HTML
}

function upgradePlan() {
    showNotification('Redirecionando para página de upgrade...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html#plans';
    }, 1500);
}

function changePlan() {
    showNotification('Redirecionando para alteração de plano...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html#plans';
    }, 1500);
}

function cancelPlan() {
    if (confirm('Tem certeza que deseja cancelar sua assinatura? Esta ação não pode ser desfeita.')) {
        showNotification('Sua assinatura foi cancelada. Você ainda terá acesso até o final do período atual.', 'warning');
        
        // Update plan status
        document.getElementById('plan-status').textContent = 'Cancelado';
        document.getElementById('plan-status').className = 'plan-status cancelled';
    }
}

// Override the login button behavior for plans page
function updateLoginState(isLoggedIn, email, name = null, role = 'user') {
    const loginBtn = document.getElementById('login-btn');
    
    if (isLoggedIn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            ${name || email.split('@')[0]}
        `;
        loginBtn.classList.add('logged-in');
        
        loginBtn.onclick = function(e) {
            e.preventDefault();
            showUserMenu(email, name, role);
        };
    } else {
        loginBtn.innerHTML = 'Começar Agora';
        loginBtn.classList.remove('logged-in');
        loginBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }
}

function showUserMenu(email, name, role = 'user') {
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    
    let adminActions = '';
    if (role === 'admin') {
        adminActions = `
            <button class="user-action-btn admin-btn" onclick="showAdminPanel()">
                <i class="fas fa-cog"></i>
                Painel Admin
            </button>
        `;
    }
    
    userMenu.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-details">
                <h4>${name || email.split('@')[0]}</h4>
                <p>${email}</p>
                ${role === 'admin' ? '<p class="user-role">Administrador</p>' : ''}
            </div>
        </div>
        <div class="user-actions">
            ${adminActions}
            <button class="user-action-btn" onclick="window.location.href='plans.html'">
                <i class="fas fa-shopping-cart"></i>
                Meus Planos
            </button>
            <button class="user-action-btn" onclick="window.location.href='index.html#contact'">
                <i class="fas fa-headset"></i>
                Suporte
            </button>
            <button class="user-action-btn" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i>
                Sair
            </button>
        </div>
    `;
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Add to page
    document.body.appendChild(userMenu);
    
    // Position menu
    const loginBtn = document.getElementById('login-btn');
    const btnRect = loginBtn.getBoundingClientRect();
    userMenu.style.top = (btnRect.bottom + 10) + 'px';
    userMenu.style.right = (window.innerWidth - btnRect.right) + 'px';
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!userMenu.contains(e.target) && e.target !== loginBtn)) {
                userMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

function logout() {
    showNotification('Logout realizado com sucesso!', 'info');
    updateLoginState(false);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function showAdminPanel() {
    const users = getUsers();
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-panel-content">
            <div class="admin-header">
                <h2>Painel Administrativo</h2>
                <button class="admin-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-stats">
                <div class="stat-card">
                    <h3>${users.length}</h3>
                    <p>Usuários Cadastrados</p>
                </div>
                <div class="stat-card">
                    <h3>${users.filter(u => u.role === 'admin').length}</h3>
                    <p>Administradores</p>
                </div>
            </div>
            <div class="admin-actions">
                <button class="btn btn-primary" onclick="showCreateUserForm()">
                    <i class="fas fa-user-plus"></i>
                    Criar Novo Usuário
                </button>
            </div>
            <div class="admin-users">
                <h3>Lista de Usuários</h3>
                <div class="users-list">
                    ${users.map(user => `
                        <div class="user-item">
                            <div class="user-info">
                                <strong>${user.name}</strong>
                                <span>${user.email}</span>
                                <span class="user-role-badge ${user.role}">${user.role}</span>
                            </div>
                            <div class="user-actions">
                                <button onclick="editUser('${user.id}')" class="edit-btn">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteUser('${user.id}')" class="delete-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add admin panel styles
    adminPanel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const content = adminPanel.querySelector('.admin-panel-content');
    content.style.cssText = `
        background: var(--card-bg);
        border-radius: 20px;
        padding: 30px;
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    document.body.appendChild(adminPanel);
}

function showCreateUserForm() {
    const createForm = document.createElement('div');
    createForm.className = 'create-user-form';
    createForm.innerHTML = `
        <div class="form-header">
            <h3>Criar Novo Usuário</h3>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <form id="create-user-form">
            <div class="form-group">
                <label for="create-name">Nome Completo</label>
                <input type="text" id="create-name" required>
            </div>
            <div class="form-group">
                <label for="create-email">Email</label>
                <input type="email" id="create-email" required>
            </div>
            <div class="form-group">
                <label for="create-password">Senha</label>
                <input type="password" id="create-password" required>
            </div>
            <div class="form-group">
                <label for="create-role">Função</label>
                <select id="create-role" required>
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Criar Usuário
                </button>
            </div>
        </form>
    `;
    
    // Add form styles
    createForm.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card-bg);
        border-radius: 15px;
        padding: 30px;
        min-width: 400px;
        z-index: 10001;
        box-shadow: var(--shadow-card);
    `;
    
    document.body.appendChild(createForm);
    
    // Add form submission handler
    document.getElementById('create-user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createNewUser();
    });
}

function createNewUser() {
    const name = document.getElementById('create-name').value;
    const email = document.getElementById('create-email').value;
    const password = document.getElementById('create-password').value;
    const role = document.getElementById('create-role').value;
    
    // Validation
    if (!name || !email || !password) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    
    // Check if user already exists
    const users = getUsers();
    if (users.find(user => user.email === email)) {
        showNotification('Este email já está cadastrado.', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    saveUsers(users);
    
    showNotification('Usuário criado com sucesso!', 'success');
    
    // Close form and refresh admin panel
    document.querySelector('.create-user-form').remove();
    showAdminPanel();
}

function editUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        showNotification('Usuário não encontrado.', 'error');
        return;
    }
    
    showNotification('Funcionalidade de edição em desenvolvimento.', 'info');
}

function deleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        const users = getUsers();
        const updatedUsers = users.filter(u => u.id !== userId);
        saveUsers(updatedUsers);
        showAdminPanel(); // Refresh panel
        showNotification('Usuário excluído com sucesso!', 'success');
    }
}

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions global
window.showAdminPanel = showAdminPanel;
window.showCreateUserForm = showCreateUserForm;
window.createNewUser = createNewUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.upgradePlan = upgradePlan;
window.changePlan = changePlan;
window.cancelPlan = cancelPlan;
window.logout = logout;
