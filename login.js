document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');
    const togglePassword = document.getElementById('togglePassword');
    
    // Default admin accounts
    const defaultAccounts = [
        { username: 'Fish', password: 'Fishtank@1', role: 'owner', permissions: { applications: true, accounts: true, settings: true } },
        { username: 'Fizzy', password: 'Fizzycoke@1', role: 'owner', permissions: { applications: true, accounts: true, settings: true } },
        { username: 'Ginger', password: 'Ginger@1', role: 'owner', permissions: { applications: true, accounts: true, settings: true } }
    ];
    
    // Check if localStorage has staff accounts, if not initialize with defaults
    if (!localStorage.getItem('staffAccounts')) {
        localStorage.setItem('staffAccounts', JSON.stringify(defaultAccounts));
    }
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });
    
    // Login functionality
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!username || !password) {
            errorMessage.textContent = 'Please enter both username and password';
            return;
        }
        
        const staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        const account = staffAccounts.find(acc => acc.username === username && acc.password === password);
        
        if (account) {
            // Set current user in localStorage
            localStorage.setItem('currentStaff', JSON.stringify(account));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            
            // Shake animation for error
            const loginCard = document.querySelector('.login-card');
            loginCard.classList.add('shake');
            
            setTimeout(() => {
                loginCard.classList.remove('shake');
            }, 500);
        }
    });
    
    // Allow login with Enter key
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(style);
});
