document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));
    if (!currentStaff) {
        window.location.href = 'Login.html';
        return;
    }
    
    // DOM Elements
    const userNameElement = document.getElementById('user-name');
    const userRoleElement = document.getElementById('user-role');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const contentSections = document.querySelectorAll('.content-section');
    const logoutBtn = document.getElementById('logout-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const searchInput = document.getElementById('search-input');
    const staffAccountsNav = document.getElementById('staff-accounts-nav');
    const staffListContainer = document.getElementById('staff-list');
    const addStaffBtn = document.getElementById('add-staff-btn');
    const staffModal = document.getElementById('staff-modal');
    const staffForm = document.getElementById('staff-form');
    const modalCloseButtons = document.querySelectorAll('.close-modal, .cancel-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const passwordModal = document.getElementById('password-modal');
    const passwordForm = document.getElementById('password-form');
    
    // Set user information
    userNameElement.textContent = currentStaff.username;
    userRoleElement.textContent = currentStaff.role;
    
    // Check permissions for staff accounts section
    if (!currentStaff.permissions.accounts) {
        staffAccountsNav.style.display = 'none';
    }
    
    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Only proceed if user has permission
            const section = this.getAttribute('data-section');
            if (section === 'staff-accounts' && !currentStaff.permissions.accounts) {
                showNotification('You do not have permission to access this section', 'error');
                return;
            }
            
            // Activate clicked nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content section
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(this.getAttribute('data-section')).classList.add('active');
        });
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentStaff');
        window.location.href = 'Login.html';
    });
    
    // Refresh data
    refreshBtn.addEventListener('click', function() {
        refreshBtn.classList.add('rotating');
        
        // Simulate data refresh
        setTimeout(() => {
            loadApplications();
            loadBanAppeals();
            loadMuteAppeals();
            loadStaffAccounts();
            showNotification('Data refreshed successfully', 'success');
            refreshBtn.classList.remove('rotating');
        }, 1000);
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeSection = document.querySelector('.content-section.active').id;
        
        switch (activeSection) {
            case 'applications':
                filterCards('.application-card', searchTerm);
                break;
            case 'ban-appeals':
                filterCards('.appeal-card', searchTerm);
                break;
            case 'mute-appeals':
                filterCards('.appeal-card', searchTerm);
                break;
            case 'staff-accounts':
                filterCards('.staff-card', searchTerm);
                break;
        }
    });
    
    // Filter cards based on search term
    function filterCards(cardSelector, searchTerm) {
        const cards = document.querySelectorAll(cardSelector);
        
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Load staff accounts
    function loadStaffAccounts() {
        // Get staff accounts from localStorage
        const staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        
        // Clear the staff list container
        staffListContainer.innerHTML = '';
        
        // Add each staff account to the list
        staffAccounts.forEach(staff => {
            const canEdit = staff.username !== currentStaff.username && staff.role !== 'owner';
            
            const staffCard = document.createElement('div');
            staffCard.className = 'staff-card';
            staffCard.setAttribute('data-username', staff.username);
            
            staffCard.innerHTML = `
                <div class="staff-header">
                    <h3>${staff.username}</h3>
                    <span class="staff-role ${staff.role}">${staff.role}</span>
                </div>
                <div class="staff-details">
                    <p><strong>Permissions:</strong></p>
                    <div class="permission-tags">
                        ${staff.permissions.applications ? '<span class="permission-tag">Applications</span>' : ''}
                        ${staff.permissions.appeals ? '<span class="permission-tag">Appeals</span>' : ''}
                        ${staff.permissions.accounts ? '<span class="permission-tag">Staff Accounts</span>' : ''}
                    </div>
                </div>
                <div class="staff-actions">
                    ${currentStaff.permissions.accounts && (staff.username === currentStaff.username || canEdit) ? 
                      `<button class="edit-btn" data-username="${staff.username}"><i class="fas fa-edit"></i> Edit</button>` : ''}
                    ${currentStaff.permissions.accounts && canEdit ? 
                      `<button class="delete-btn" data-username="${staff.username}"><i class="fas fa-trash"></i> Delete</button>` : ''}
                </div>
            `;
            
            staffListContainer.appendChild(staffCard);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const username = this.getAttribute('data-username');
                openEditStaffModal(username);
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const username = this.getAttribute('data-username');
                if (confirm(`Are you sure you want to delete ${username}?`)) {
                    deleteStaffAccount(username);
                }
            });
        });
    }
    
    // Delete staff account
    function deleteStaffAccount(username) {
        let staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        
        // Filter out the account to delete
        staffAccounts = staffAccounts.filter(staff => staff.username !== username);
        
        // Save updated staff accounts to localStorage
        localStorage.setItem('staffAccounts', JSON.stringify(staffAccounts));
        
        // Reload staff accounts
        loadStaffAccounts();
        
        showNotification(`Staff account ${username} has been deleted`, 'success');
    }
    
    // Open the staff modal for editing
    function openEditStaffModal(username) {
        const staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        const staff = staffAccounts.find(s => s.username === username);
        
        if (!staff) return;
        
        // Set modal title
        document.getElementById('modal-title').textContent = 'Edit Staff Account';
        
        // Populate form fields
        document.getElementById('staff-username').value = staff.username;
        document.getElementById('staff-password').value = ''; // Don't show password for security
        document.getElementById('staff-role').value = staff.role;
        document.getElementById('perm-applications').checked = staff.permissions.applications;
        document.getElementById('perm-appeals').checked = staff.permissions.appeals;
        document.getElementById('perm-accounts').checked = staff.permissions.accounts;
        document.getElementById('staff-id').value = staff.username; // Store original username for reference
        
        // Disable username field for editing existing accounts
        document.getElementById('staff-username').readOnly = true;
        
        // Disable role field for owners (can't change owner role)
        if (staff.role === 'owner') {
            document.getElementById('staff-role').disabled = true;
        } else {
            document.getElementById('staff-role').disabled = false;
        }
        
        // Show the modal
        staffModal.style.display = 'flex';
    }
    
    // Add new staff account button
    addStaffBtn.addEventListener('click', function() {
        // Set modal title
        document.getElementById('modal-title').textContent = 'Add New Staff Account';
        
        // Clear form fields
        staffForm.reset();
        document.getElementById('staff-id').value = '';
        
        // Enable username field for new accounts
        document.getElementById('staff-username').readOnly = false;
        document.getElementById('staff-role').disabled = false;
        
        // Show the modal
        staffModal.style.display = 'flex';
    });
    
    // Staff form submission
    staffForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('staff-username').value.trim();
        const password = document.getElementById('staff-password').value;
        const role = document.getElementById('staff-role').value;
        const permApplications = document.getElementById('perm-applications').checked;
        const permAppeals = document.getElementById('perm-appeals').checked;
        const permAccounts = document.getElementById('perm-accounts').checked;
        const originalUsername = document.getElementById('staff-id').value;
        
        let staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        
        // Check if this is an edit or a new staff account
        if (originalUsername) {
            // Editing existing account
            const staffIndex = staffAccounts.findIndex(s => s.username === originalUsername);
            
            if (staffIndex === -1) {
                showNotification('Staff account not found', 'error');
                return;
            }
            
            // Update the account info
            staffAccounts[staffIndex] = {
                username: username,
                password: password ? password : staffAccounts[staffIndex].password, // Only update if new password provided
                role: role,
                permissions: {
                    applications: permApplications,
                    appeals: permAppeals,
                    accounts: permAccounts
                }
            };
            
            showNotification(`Staff account ${username} updated successfully`, 'success');
        } else {
            // Adding new account
            // Check if username already exists
            if (staffAccounts.some(s => s.username === username)) {
                showNotification('Username already exists', 'error');
                return;
            }
            
            // Add new staff account
            staffAccounts.push({
                username: username,
                password: password,
                role: role,
                permissions: {
                    applications: permApplications,
                    appeals: permAppeals,
                    accounts: permAccounts
                }
            });
            
            showNotification(`Staff account ${username} added successfully`, 'success');
        }
        
        // Save updated staff accounts to localStorage
        localStorage.setItem('staffAccounts', JSON.stringify(staffAccounts));
        
        // If current user was edited, update current staff info
        if (originalUsername === currentStaff.username) {
            const updatedStaff = staffAccounts.find(s => s.username === username);
            localStorage.setItem('currentStaff', JSON.stringify(updatedStaff));
            
            // Update displayed user info
            userNameElement.textContent = updatedStaff.username;
            userRoleElement.textContent = updatedStaff.role;
        }
        
        // Reload staff accounts
        loadStaffAccounts();
        
        // Close the modal
        staffModal.style.display = 'none';
    });
    
    // Change password functionality
    changePasswordBtn.addEventListener('click', function() {
        passwordModal.style.display = 'flex';
    });
    
    // Password form submission
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validate current password
        if (currentPassword !== currentStaff.password) {
            showNotification('Current password is incorrect', 'error');
            return;
        }
        
        // Validate new passwords match
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        // Update password in staff accounts
        let staffAccounts = JSON.parse(localStorage.getItem('staffAccounts'));
        const staffIndex = staffAccounts.findIndex(s => s.username === currentStaff.username);
        
        if (staffIndex !== -1) {
            staffAccounts[staffIndex].password = newPassword;
            
            // Update localStorage
            localStorage.setItem('staffAccounts', JSON.stringify(staffAccounts));
            
            // Update current staff info
            currentStaff.password = newPassword;
            localStorage.setItem('currentStaff', JSON.stringify(currentStaff));
            
            showNotification('Password updated successfully', 'success');
            
            // Close the modal and reset form
            passwordModal.style.display = 'none';
            passwordForm.reset();
        }
    });
    
    // Close modals when clicking the close button or cancel button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            staffModal.style.display = 'none';
            passwordModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === staffModal) {
            staffModal.style.display = 'none';
        }
        if (event.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });
    
    // Load applications data
    function loadApplications() {
        // This would typically fetch data from a server
        // For this example, we'll just simulate loading applications
        
        // Application list would be populated here in a real application
        const applicationFilter = document.getElementById('application-filter');
        if (applicationFilter) {
            applicationFilter.addEventListener('change', function() {
                const status = this.value;
                filterApplicationsByStatus(status);
            });
        }
    }
    
    // Filter applications by status
    function filterApplicationsByStatus(status) {
        const applications = document.querySelectorAll('.application-card');
        
        applications.forEach(app => {
            const appStatus = app.querySelector('.status').classList[1]; // Gets the status class
            
            if (status === 'all' || appStatus === status) {
                app.style.display = '';
            } else {
                app.style.display = 'none';
            }
        });
    }
    
    // Load ban appeals data
    function loadBanAppeals() {
        // Simulated loading of ban appeals
        const banAppealFilter = document.getElementById('ban-appeal-filter');
        if (banAppealFilter) {
            banAppealFilter.addEventListener('change', function() {
                const status = this.value;
                filterAppealsByStatus('ban-appeals-list', status);
            });
        }
    }
    
    // Load mute appeals data
    function loadMuteAppeals() {
        // Simulated loading of mute appeals
        const muteAppealFilter = document.getElementById('mute-appeal-filter');
        if (muteAppealFilter) {
            muteAppealFilter.addEventListener('change', function() {
                const status = this.value;
                filterAppealsByStatus('mute-appeals-list', status);
            });
        }
    }
    
    // Filter appeals by status
    function filterAppealsByStatus(listId, status) {
        const appeals = document.querySelectorAll(`#${listId} .appeal-card`);
        
        appeals.forEach(appeal => {
            const appealStatus = appeal.querySelector('.status').classList[1];
            
            if (status === 'all' || appealStatus === status) {
                appeal.style.display = '';
            } else {
                appeal.style.display = 'none';
            }
        });
    }
    
    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        // Create notifications container if it doesn't exist
        let notificationsContainer = document.querySelector('.notifications-container');
        if (!notificationsContainer) {
            notificationsContainer = document.createElement('div');
            notificationsContainer.className = 'notifications-container';
            document.body.appendChild(notificationsContainer);
            
            // Add CSS for notifications
            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                .notifications-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .notification {
                    background-color: #2a2a2a;
                    color: var(--text-color);
                    padding: 15px;
                    border-radius: 5px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    max-width: 350px;
                    position: relative;
                    animation: slideInRight 0.3s ease-out forwards;
                }
                
                .notification.success {
                    border-left: 4px solid var(--highlight-color);
                }
                
                .notification.error {
                    border-left: 4px solid var(--danger-color);
                }
                
                .notification.warning {
                    border-left: 4px solid var(--warning-color);
                }
                
                .notification i {
                    font-size: 1.2rem;
                    margin-right: 10px;
                }
                
                .notification.success i {
                    color: var(--highlight-color);
                }
                
                .notification.error i {
                    color: var(--danger-color);
                }
                
                .notification.warning i {
                    color: var(--warning-color);
                }
                
                .notification p {
                    flex: 1;
                }
                
                .close-notification {
                    background: transparent;
                    border: none;
                    color: var(--text-color);
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }
                
                .close-notification:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                .rotating {
                    animation: rotate 1s linear infinite;
                }
                
                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(notificationStyle);
        }
        
        // Add notification to container
        notificationsContainer.appendChild(notification);
        
        // Close button functionality
        notification.querySelector('.close-notification').addEventListener('click', function() {
            closeNotification(notification);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }
    
    // Close notification with animation
    function closeNotification(notification) {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // Initial data load
    loadApplications();
    loadBanAppeals();
    loadMuteAppeals();
    loadStaffAccounts();
});
