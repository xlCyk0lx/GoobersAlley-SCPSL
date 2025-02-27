document.addEventListener('DOMContentLoaded', function() {
    // Mock data for testing functionality
    const mockData = {
        currentUser: {
            id: 'admin1',
            username: 'Administrator',
            role: 'Admin',
            permissions: ['applications', 'appeals', 'accounts']
        },
        applications: [
            {
                id: 'app1',
                name: 'D-9341',
                age: '17',
                discord: 'D9341#1234',
                email: 'd9341@scpsl.com',
                experience: '2 years as moderator on other servers',
                status: 'pending'
            },
            {
                id: 'app2',
                name: 'Dr. Bright',
                age: '21',
                discord: 'DrBright#9999',
                email: 'bright@scpsl.com',
                experience: 'Admin on several SCP communities',
                status: 'pending'
            }
        ],
        banAppeals: [
            {
                id: 'ban1',
                name: 'ClassD_Player123',
                banDate: '2023-05-15',
                discord: 'ClassD123#5678',
                reason: 'Using exploits',
                appeal: 'I wasn\'t using exploits, it was a game bug...',
                status: 'pending'
            }
        ],
        muteAppeals: [
            {
                id: 'mute1',
                name: 'MTF_Commander',
                muteDate: '2023-05-20',
                discord: 'MTF_Commander#1111',
                type: 'Voice Chat',
                reason: 'Excessive noise/mic spam',
                appeal: 'It wasn\'t intentional, my mic was malfunctioning...',
                status: 'pending'
            }
        ],
        staffAccounts: [
            {
                id: 'staff1',
                username: 'Administrator',
                role: 'admin',
                permissions: ['applications', 'appeals', 'accounts']
            },
            {
                id: 'staff2',
                username: 'SeniorMod',
                role: 'moderator',
                permissions: ['applications', 'appeals']
            },
            {
                id: 'staff3',
                username: 'JuniorHelper',
                role: 'helper',
                permissions: ['applications']
            }
        ]
    };

    // Cache DOM elements
    const elements = {
        sidebar: document.querySelector('.sidebar'),
        sidebarToggle: document.getElementById('sidebar-toggle'),
        navItems: document.querySelectorAll('.sidebar-nav li'),
        contentSections: document.querySelectorAll('.content-section'),
        searchInput: document.getElementById('search-input'),
        refreshBtn: document.getElementById('refresh-btn'),
        notificationsDropdown: document.getElementById('notifications-dropdown'),
        logoutBtn: document.getElementById('logout-btn'),
        
        // Applications elements
        applicationsList: document.getElementById('applications-list'),
        applicationFilter: document.getElementById('application-filter'),
        
        // Ban Appeals elements
        banAppealsList: document.getElementById('ban-appeals-list'),
        banAppealFilter: document.getElementById('ban-appeal-filter'),
        
        // Mute Appeals elements
        muteAppealsList: document.getElementById('mute-appeals-list'),
        muteAppealFilter: document.getElementById('mute-appeal-filter'),
        
        // Staff Accounts elements
        staffList: document.getElementById('staff-list'),
        addStaffBtn: document.getElementById('add-staff-btn'),
        staffModal: document.getElementById('staff-modal'),
        staffForm: document.getElementById('staff-form'),
        
        // Settings elements
        changePasswordBtn: document.getElementById('change-password-btn'),
        passwordModal: document.getElementById('password-modal'),
        passwordForm: document.getElementById('password-form'),
        emailNotifications: document.getElementById('email-notifications'),
        desktopNotifications: document.getElementById('desktop-notifications')
    };

    // Initialize user data
    function initializeUserData() {
        const user = mockData.currentUser;
        document.getElementById('user-name').textContent = user.username;
        document.getElementById('user-role').textContent = user.role;
        
        // Set permissions-based access
        if (!user.permissions.includes('accounts')) {
            document.getElementById('staff-accounts-nav').style.display = 'none';
        }
    }

    // Navigation functionality
    function setupNavigation() {
        elements.navItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                
                // Update active nav item
                elements.navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected section
                elements.contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(sectionId).classList.add('active');
            });
        });
        
        // Sidebar toggle
        elements.sidebarToggle.addEventListener('click', function() {
            elements.sidebar.classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });
    }

    // Search functionality
    function setupSearch() {
        elements.searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Determine which section is active
            const activeSection = document.querySelector('.content-section.active').id;
            
            switch(activeSection) {
                case 'applications':
                    filterApplications(searchTerm);
                    break;
                case 'ban-appeals':
                    filterBanAppeals(searchTerm);
                    break;
                case 'mute-appeals':
                    filterMuteAppeals(searchTerm);
                    break;
                case 'staff-accounts':
                    filterStaffAccounts(searchTerm);
                    break;
            }
        });
    }

    // Filter functions for search
    function filterApplications(term) {
        const cards = elements.applicationsList.querySelectorAll('.application-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const details = card.querySelector('.application-details').textContent.toLowerCase();
            if (name.includes(term) || details.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterBanAppeals(term) {
        const cards = elements.banAppealsList.querySelectorAll('.appeal-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const details = card.querySelector('.appeal-details').textContent.toLowerCase();
            if (name.includes(term) || details.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterMuteAppeals(term) {
        const cards = elements.muteAppealsList.querySelectorAll('.appeal-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const details = card.querySelector('.appeal-details').textContent.toLowerCase();
            if (name.includes(term) || details.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterStaffAccounts(term) {
        const cards = elements.staffList.querySelectorAll('.staff-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const role = card.querySelector('.role-badge').textContent.toLowerCase();
            if (name.includes(term) || role.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Applications section functionality
    function initializeApplications() {
        // Filter event
        elements.applicationFilter.addEventListener('change', function() {
            const status = this.value;
            const cards = elements.applicationsList.querySelectorAll('.application-card');
            
            cards.forEach(card => {
                const cardStatus = card.querySelector('.status').classList[1];
                if (status === 'all' || status === cardStatus) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Add button actions to existing cards
        const applicationCards = document.querySelectorAll('.application-card');
        applicationCards.forEach(card => {
            const viewBtn = card.querySelector('.view-btn');
            const approveBtn = card.querySelector('.approve-btn');
            const rejectBtn = card.querySelector('.reject-btn');
            
            viewBtn.addEventListener('click', function() {
                const appId = card.getAttribute('data-id');
                const app = mockData.applications.find(a => a.id === appId);
                showApplicationDetails(app);
            });
            
            approveBtn.addEventListener('click', function() {
                const appId = card.getAttribute('data-id');
                updateApplication(appId, 'approved');
            });
            
            rejectBtn.addEventListener('click', function() {
                const appId = card.getAttribute('data-id');
                updateApplication(appId, 'rejected');
            });
        });
    }

    // Ban Appeals section functionality
    function initializeBanAppeals() {
        // Filter event
        elements.banAppealFilter.addEventListener('change', function() {
            const status = this.value;
            const cards = elements.banAppealsList.querySelectorAll('.appeal-card');
            
            cards.forEach(card => {
                const cardStatus = card.querySelector('.status').classList[1];
                if (status === 'all' || status === cardStatus) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Add button actions to existing cards
        const appealCards = elements.banAppealsList.querySelectorAll('.appeal-card');
        appealCards.forEach(card => {
            const viewBtn = card.querySelector('.view-btn');
            const approveBtn = card.querySelector('.approve-btn');
            const rejectBtn = card.querySelector('.reject-btn');
            
            viewBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                const appeal = mockData.banAppeals.find(a => a.id === appealId);
                showAppealDetails(appeal, 'ban');
            });
            
            approveBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                updateBanAppeal(appealId, 'approved');
            });
            
            rejectBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                updateBanAppeal(appealId, 'rejected');
            });
        });
    }

    // Mute Appeals section functionality
    function initializeMuteAppeals() {
        // Filter event
        elements.muteAppealFilter.addEventListener('change', function() {
            const status = this.value;
            const cards = elements.muteAppealsList.querySelectorAll('.appeal-card');
            
            cards.forEach(card => {
                const cardStatus = card.querySelector('.status').classList[1];
                if (status === 'all' || status === cardStatus) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Add button actions to existing cards
        const appealCards = elements.muteAppealsList.querySelectorAll('.appeal-card');
        appealCards.forEach(card => {
            const viewBtn = card.querySelector('.view-btn');
            const approveBtn = card.querySelector('.approve-btn');
            const rejectBtn = card.querySelector('.reject-btn');
            
            viewBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                const appeal = mockData.muteAppeals.find(a => a.id === appealId);
                showAppealDetails(appeal, 'mute');
            });
            
            approveBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                updateMuteAppeal(appealId, 'approved');
            });
            
            rejectBtn.addEventListener('click', function() {
                const appealId = card.getAttribute('data-id');
                updateMuteAppeal(appealId, 'rejected');
            });
        });
    }

    // Staff Accounts section functionality
    function initializeStaffAccounts() {
        renderStaffList();
        
        // Add new staff button
        elements.addStaffBtn.addEventListener('click', function() {
            openStaffModal();
        });
        
        // Staff form submission
        elements.staffForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveStaffMember();
        });
        
        // Close modal buttons
        document.querySelectorAll('.close-modal, .cancel-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                closeModals();
            });
        });
    }

    // Render staff list
    function renderStaffList() {
        elements.staffList.innerHTML = '';
        
        mockData.staffAccounts.forEach(staff => {
            const staffCard = document.createElement('div');
            staffCard.className = 'staff-card';
            staffCard.setAttribute('data-id', staff.id);
            
            staffCard.innerHTML = `
                <div class="staff-info">
                    <h3>${staff.username}</h3>
                    <span class="role-badge ${staff.role}">${capitalizeFirstLetter(staff.role)}</span>
                </div>
                <div class="staff-permissions">
                    ${staff.permissions.map(perm => `<span class="permission-badge">${capitalizeFirstLetter(perm)}</span>`).join('')}
                </div>
                <div class="staff-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
            `;
            
            elements.staffList.appendChild(staffCard);
            
            // Add button listeners
            const editBtn = staffCard.querySelector('.edit-btn');
            const deleteBtn = staffCard.querySelector('.delete-btn');
            
            editBtn.addEventListener('click', function() {
                editStaffMember(staff.id);
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteStaffMember(staff.id);
            });
        });
    }

    // Open staff modal for adding/editing
    function openStaffModal(staffId = null) {
        const modalTitle = document.getElementById('modal-title');
        const staffUsernameInput = document.getElementById('staff-username');
        const staffPasswordInput = document.getElementById('staff-password');
        const staffRoleSelect = document.getElementById('staff-role');
        const staffIdInput = document.getElementById('staff-id');
        const permApplicationsCheckbox = document.getElementById('perm-applications');
        const permAppealsCheckbox = document.getElementById('perm-appeals');
        const permAccountsCheckbox = document.getElementById('perm-accounts');
        
        // Reset form
        elements.staffForm.reset();
        
        if (staffId) {
            // Edit existing staff
            const staff = mockData.staffAccounts.find(s => s.id === staffId);
            if (staff) {
                modalTitle.textContent = 'Edit Staff Member';
                staffUsernameInput.value = staff.username;
                staffPasswordInput.value = '********'; // Placeholder for password
                staffPasswordInput.placeholder = 'Leave blank to keep current password';
                staffPasswordInput.required = false;
                staffRoleSelect.value = staff.role;
                staffIdInput.value = staff.id;
                
                // Set permissions
                permApplicationsCheckbox.checked = staff.permissions.includes('applications');
                permAppealsCheckbox.checked = staff.permissions.includes('appeals');
                permAccountsCheckbox.checked = staff.permissions.includes('accounts');
            }
        } else {
            // Add new staff
            modalTitle.textContent = 'Add New Staff';
            staffPasswordInput.required = true;
            staffPasswordInput.placeholder = 'Password';
            staffIdInput.value = '';
        }
        
        // Show modal
        elements.staffModal.style.display = 'block';
    }

    // Save staff member (add or update)
    function saveStaffMember() {
        const username = document.getElementById('staff-username').value;
        const password = document.getElementById('staff-password').value;
        const role = document.getElementById('staff-role').value;
        const staffId = document.getElementById('staff-id').value;
        
        // Get permissions
        const permissions = [];
        if (document.getElementById('perm-applications').checked) permissions.push('applications');
        if (document.getElementById('perm-appeals').checked) permissions.push('appeals');
        if (document.getElementById('perm-accounts').checked) permissions.push('accounts');
        
        if (staffId) {
            // Update existing staff
            const staffIndex = mockData.staffAccounts.findIndex(s => s.id === staffId);
            if (staffIndex !== -1) {
                mockData.staffAccounts[staffIndex] = {
                    ...mockData.staffAccounts[staffIndex],
                    username,
                    role,
                    permissions
                };
                // Only update password if provided
                if (password && password !== '********') {
                    // In a real app, you would hash the password here
                }
            }
        } else {
            // Add new staff
            const newStaff = {
                id: 'staff' + (mockData.staffAccounts.length + 1),
                username,
                role,
                permissions
                // In a real app, you would hash the password here
            };
            mockData.staffAccounts.push(newStaff);
        }
        
        // Update UI
        renderStaffList();
        closeModals();
        showNotification('Staff account saved successfully');
    }

    // Edit staff member
    function editStaffMember(staffId) {
        openStaffModal(staffId);
    }

    // Delete staff member
    function deleteStaffMember(staffId) {
        if (confirm('Are you sure you want to delete this staff member?')) {
            mockData.staffAccounts = mockData.staffAccounts.filter(staff => staff.id !== staffId);
            renderStaffList();
            showNotification('Staff account deleted successfully');
        }
    }

    // Settings section functionality
    function initializeSettings() {
        // Change password button
        elements.changePasswordBtn.addEventListener('click', function() {
            elements.passwordModal.style.display = 'block';
        });
        
        // Password form submission
        elements.passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            changePassword();
        });
        
        // Settings switches
        elements.emailNotifications.addEventListener('change', function() {
            // In a real app, you would save this setting to the user profile
            showNotification('Email notification settings updated');
        });
        
        elements.desktopNotifications.addEventListener('change', function() {
            if (this.checked) {
                requestNotificationPermission();
            } else {
                showNotification('Desktop notification settings updated');
            }
        });
    }

    // Change password function
    function changePassword() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('All fields are required', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        // In a real app, you would verify the current password and update with the new one
        
        // Close modal and reset form
        elements.passwordForm.reset();
        elements.passwordModal.style.display = 'none';
        showNotification('Password changed successfully');
    }

    // Request permission for desktop notifications
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification('Desktop notifications enabled');
                } else {
                    elements.desktopNotifications.checked = false;
                    showNotification('Desktop notification permission denied', 'error');
                }
            });
        } else {
            elements.desktopNotifications.checked = false;
            showNotification('Desktop notifications not supported in this browser', 'error');
        }
    }

    // Update application status
    function updateApplication(appId, status) {
        const app = mockData.applications.find(a => a.id === appId);
        if (app) {
            app.status = status;
            
            // Update UI
            const card = document.querySelector(`.application-card[data-id="${appId}"]`);
            const statusEl = card.querySelector('.status');
            
            // Remove existing status classes
            statusEl.classList.remove('pending', 'approved', 'rejected');
            // Add new status class
            statusEl.classList.add(status);
            statusEl.textContent = capitalizeFirstLetter(status);
            
            showNotification(`Application ${status}`);
            
            // If approved, could create staff account here in a real app
        }
    }

    // Update ban appeal status
    function updateBanAppeal(appealId, status) {
        const appeal = mockData.banAppeals.find(a => a.id === appealId);
        if (appeal) {
            appeal.status = status;
            
            // Update UI
            const card = document.querySelector(`.appeal-card[data-id="${appealId}"]`);
            const statusEl = card.querySelector('.status');
            
            // Remove existing status classes
            statusEl.classList.remove('pending', 'approved', 'rejected');
            // Add new status class
            statusEl.classList.add(status);
            statusEl.textContent = capitalizeFirstLetter(status);
            
            showNotification(`Ban appeal ${status}`);
            
            // If approved, could unban user here in a real app
        }
    }

    // Update mute appeal status
    function updateMuteAppeal(appealId, status) {
        const appeal = mockData.muteAppeals.find(a => a.id === appealId);
        if (appeal) {
            appeal.status = status;
            
            // Update UI
            const card = document.querySelector(`.appeal-card[data-id="${appealId}"]`);
            const statusEl = card.querySelector('.status');
            
            // Remove existing status classes
            statusEl.classList.remove('pending', 'approved', 'rejected');
            // Add new status class
            statusEl.classList.add(status);
            statusEl.textContent = capitalizeFirstLetter(status);
            
            showNotification(`Mute appeal ${status}`);
            
            // If approved, could unmute user here in a real app
        }
    }

    // Show application details in a modal
    function showApplicationDetails(application) {
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'application-details-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Application Details</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${application.name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Age:</span>
                        <span class="detail-value">${application.age}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Discord:</span>
                        <span class="detail-value">${application.discord}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${application.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Experience:</span>
                        <span class="detail-value">${application.experience}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value status ${application.status}">${capitalizeFirstLetter(application.status)}</span>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="approve-btn" data-id="${application.id}">Approve</button>
                        <button type="button" class="reject-btn" data-id="${application.id}">Reject</button>
                        <button type="button" class="close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal, .close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        const approveBtn = modal.querySelector('.approve-btn');
        approveBtn.addEventListener('click', function() {
            const appId = this.getAttribute('data-id');
            updateApplication(appId, 'approved');
            modal.remove();
        });
        
        const rejectBtn = modal.querySelector('.reject-btn');
        rejectBtn.addEventListener('click', function() {
            const appId = this.getAttribute('data-id');
            updateApplication(appId, 'rejected');
            modal.remove();
        });
    }

    // Show appeal details in a modal
    function showAppealDetails(appeal, type) {
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'appeal-details-modal';
        
        let typeSpecificFields = '';
        if (type === 'ban') {
            typeSpecificFields = `
                <div class="detail-row">
                    <span class="detail-label">Ban Date:</span>
                    <span class="detail-value">${appeal.banDate}</span>
                </div>
            `;
        } else if (type === 'mute') {
            typeSpecificFields = `
                <div class="detail-row">
                    <span class="detail-label">Mute Date:</span>
                    <span class="detail-value">${appeal.muteDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${appeal.type}</span>
                </div>
            `;
        }
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${capitalizeFirstLetter(type)} Appeal Details</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${appeal.name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Discord:</span>
                        <span class="detail-value">${appeal.discord}</span>
                    </div>
                    ${typeSpecificFields}
                    <div class="detail-row">
                        <span class="detail-label">Reason:</span>
                        <span class="detail-value">${appeal.reason}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Appeal:</span>
                        <span class="detail-value">${appeal.appeal}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value status ${appeal.status}">${capitalizeFirstLetter(appeal.status)}</span>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="approve-btn" data-id="${appeal.id}">Approve</button>
                        <button type="button" class="reject-btn" data-id="${appeal.id}">Reject</button>
                        <button type="button" class="close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal, .close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        const approveBtn = modal.querySelector('.approve-btn');
        approveBtn.addEventListener('click', function() {
            const appealId = this.getAttribute('data-id');
            if (type === 'ban') {
                updateBanAppeal(appealId, 'approved');
            } else if (type === 'mute') {
                updateMuteAppeal(appealId, 'approved');
            }
            modal.remove();
        });
        
        const rejectBtn = modal.querySelector('.reject-btn');
        rejectBtn.addEventListener('click', function() {
            const appealId = this.getAttribute('data-id');
            if (type === 'ban') {
                updateBanAppeal(appealId, 'rejected');
            } else if (type === 'mute') {
                updateMuteAppeal(appealId, 'rejected');
            }
            modal.remove();
        });
    }

    // Close all modals
    function closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Show notification message
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-hide after a few seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Refresh data
    function refreshData() {
        const activeSection = document.querySelector('.content-section.active').id;
        
        // In a real app, this would fetch fresh data from the server
        showNotification('Data refreshed successfully');
        
        // Animate refresh button
        elements.refreshBtn.classList.add('rotating');
        setTimeout(() => {
            elements.refreshBtn.classList.remove('rotating');
        }, 1000);
    }

    // Logout function
    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            // In a real app, this would clear session/tokens and redirect to login
            window.location.href = 'login.html';
        }
    }

    // Notifications dropdown toggle
    function setupNotificationsDropdown() {
        const button = elements.notificationsDropdown.querySelector('.notifications-btn');
        const content = elements.notificationsDropdown.querySelector('.dropdown-content');
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            content.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!elements.notificationsDropdown.contains(e.target)) {
                content.classList.remove('show');
            }
        });
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Initialize event listeners for existing elements
    function initializeEventListeners() {
        // Setup refresh button
        elements.refreshBtn.addEventListener('click', refreshData);
        
        // Setup logout button
        elements.logoutBtn.addEventListener('click', logout);
        
        // Setup notifications dropdown
        setupNotificationsDropdown();
        
        // Close modal on clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModals();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModals();
            }
        });
    }

    // Initialize everything
    function init() {
        initializeUserData();
        setupNavigation();
        setupSearch();
        initializeApplications();
        initializeBanAppeals();
        initializeMuteAppeals();
        initializeStaffAccounts();
        initializeSettings();
        initializeEventListeners();
    }

    // Run initialization
    init();
});


