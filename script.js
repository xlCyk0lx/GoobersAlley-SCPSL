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
        
        submitForm(this);
    });
    
    banAppealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm(this);
    });
    
    muteAppealForm.addEventListener('submit', function(e) {
        e.preventDefault();
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
        // In a real application, you would send the form data to a server here
        // For now, we'll just simulate a successful submission
        
        // Log form data to console (for demonstration purposes)
        const formData = new FormData(form);
        console.log('Form submitted with the following data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Show success message
        hideAllForms();
        successMessage.classList.remove('hidden');
        
        // Reset the form
        form.reset();
    }
});
