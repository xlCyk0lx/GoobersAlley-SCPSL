document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const optionsContainer = document.querySelector('.options');
    const formContainer = document.getElementById('form-container');
    const staffForm = document.getElementById('staff-form');
    const banForm = document.getElementById('ban-form');
    const muteForm = document.getElementById('mute-form');
    const backButton = document.getElementById('back-button');
    const successMessage = document.getElementById('success-message');
    const returnHomeButton = document.getElementById('return-home');
    
    // Option cards
    const staffOption = document.getElementById('staff-option');
    const banOption = document.getElementById('ban-option');
    const muteOption = document.getElementById('mute-option');
    
    // Forms
    const staffApplicationForm = document.getElementById('staff-application-form');
    const banAppealForm = document.getElementById('ban-appeal-form');
    const muteAppealForm = document.getElementById('mute-appeal-form');
    
    // Range slider for staff application
    const knowledgeSlider = document.getElementById('staff-knowledge');
    const knowledgeValue = document.getElementById('knowledge-value');
    
    // Initialize data storage if needed
    initializeDataStorage();
    
    // Event listeners for option cards
    staffOption.addEventListener('click', function() {
        showForm(staffForm);
    });
    
    banOption.addEventListener('click', function() {
        showForm(banForm);
    });
    
    muteOption.addEventListener('click', function() {
        showForm(muteForm);
    });
    
    // Back button functionality
    backButton.addEventListener('click', function() {
        hideAllForms();
        formContainer.classList.add('hidden');
        optionsContainer.style.display = 'flex';
    });
    
    // Return home button
    returnHomeButton.addEventListener('click', function() {
        successMessage.classList.add('hidden');
        formContainer.classList.add('hidden');
        optionsContainer.style.display = 'flex';
    });
    
    // Knowledge slider in staff form
    knowledgeSlider.addEventListener('input', function() {
        knowledgeValue.textContent = this.value;
    });
    
    // Form submissions
    staffApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validate age
        const age = document.getElementById('staff-age').value;
        if (parseInt(age) < 13) {
            alert('You must be at least 13 years old to apply for staff.');
            return;
        }
        
        const staffApplication = {
            id: generateId(),
            type: 'staff',
            email: document.getElementById('staff-email').value,
            ingameName: document.getElementById('staff-ingame').value,
            discord: document.getElementById('staff-discord').value,
            age: document.getElementById('staff-age').value,
            experience: document.getElementById('staff-experience').value,
            why: document.getElementById('staff-why').value,
            hoursPerWeek: document.getElementById('staff-hours').value,
            knowledgeLevel: document.getElementById('staff-knowledge').value,
            status: 'pending', // pending, approved, rejected
            dateSubmitted: new Date().toISOString(),
            reviewedBy: null,
            reviewDate: null,
            comments: null
        };
        
        saveStaffApplication(staffApplication);
        submitForm(this);
    });
    
    banAppealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const banAppeal = {
            id: generateId(),
            type: 'ban',
            email: document.getElementById('ban-email').value,
            ingameName: document.getElementById('ban-ingame').value,
            discord: document.getElementById('ban-discord').value,
            banDate: document.getElementById('ban-date').value,
            reason: document.getElementById('ban-reason').value,
            appeal: document.getElementById('ban-appeal').value,
            learned: document.getElementById('ban-learn').value,
            status: 'pending', // pending, approved, rejected
            dateSubmitted: new Date().toISOString(),
            reviewedBy: null,
            reviewDate: null,
            comments: null
        };
        
        saveBanAppeal(banAppeal);
        submitForm(this);
    });
    
    muteAppealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const muteAppeal = {
            id: generateId(),
            type: 'mute',
            email: document.getElementById('mute-email').value,
            ingameName: document.getElementById('mute-ingame').value,
            discord: document.getElementById('mute-discord').value,
            muteType: document.getElementById('mute-type').value,
            muteDate: document.getElementById('mute-date').value,
            reason: document.getElementById('mute-reason').value,
            appeal: document.getElementById('mute-appeal').value,
            status: 'pending', // pending, approved, rejected
            dateSubmitted: new Date().toISOString(),
            reviewedBy: null,
            reviewDate: null,
            comments: null
        };
        
        saveMuteAppeal(muteAppeal);
        submitForm(this);
    });
    
    // Helper functions
    function showForm(formElement) {
        optionsContainer.style.display = 'none';
        formContainer.classList.remove('hidden');
        hideAllForms();
        formElement.classList.remove('hidden');
    }
    
    function hideAllForms() {
        staffForm.classList.add('hidden');
        banForm.classList.add('hidden');
        muteForm.classList.add('hidden');
        successMessage.classList.add('hidden');
    }
    
    function submitForm(form) {
        // Show success message
        hideAllForms();
        successMessage.classList.remove('hidden');
        
        // Reset the form
        form.reset();
        if (form === staffApplicationForm) {
            document.getElementById('knowledge-value').textContent = "5";
            document.getElementById('staff-knowledge').value = 5;
        }
    }
    
    // Data storage functions
    function initializeDataStorage() {
        if (!localStorage.getItem('staffApplications')) {
            localStorage.setItem('staffApplications', JSON.stringify([]));
        }
        if (!localStorage.getItem('banAppeals')) {
            localStorage.setItem('banAppeals', JSON.stringify([]));
        }
        if (!localStorage.getItem('muteAppeals')) {
            localStorage.setItem('muteAppeals', JSON.stringify([]));
        }
    }
    
    function saveStaffApplication(application) {
        const applications = JSON.parse(localStorage.getItem('staffApplications'));
        applications.push(application);
        localStorage.setItem('staffApplications', JSON.stringify(applications));
    }
    
    function saveBanAppeal(appeal) {
        const appeals = JSON.parse(localStorage.getItem('banAppeals'));
        appeals.push(appeal);
        localStorage.setItem('banAppeals', JSON.stringify(appeals));
    }
    
    function saveMuteAppeal(appeal) {
        const appeals = JSON.parse(localStorage.getItem('muteAppeals'));
        appeals.push(appeal);
        localStorage.setItem('muteAppeals', JSON.stringify(appeals));
    }
    
    // Helper function to generate unique IDs
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
});
