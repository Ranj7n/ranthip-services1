document.addEventListener('DOMContentLoaded', () => {
    const addPassengerBtn = document.getElementById('add-passenger');
    const passengerContainer = document.getElementById('passenger-container');
    const form = document.getElementById('tatkalForm');
    const successMessage = document.getElementById('success-message');

    // Add new passenger row functionality
    if (addPassengerBtn) {
        addPassengerBtn.addEventListener('click', () => {
            const newRow = document.createElement('div');
            newRow.className = 'passenger-row';
            newRow.innerHTML = `
                <input type="text" name="passName[]" placeholder="Passenger Name" required>
                <input type="number" name="passAge[]" placeholder="Age" required>
                <select name="berthPref[]">
                    <option value="">Berth Pref</option>
                    <option value="Lower">Lower</option>
                    <option value="Middle">Middle</option>
                    <option value="Upper">Upper</option>
                </select>
            `;
            passengerContainer.appendChild(newRow);
        });
    }

    // Form Submission Logic
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            
            // IMPORTANT: Replace the URL below with your actual Google Script Web App URL
            const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; 

            fetch(scriptURL, { 
                method: 'POST', 
                body: formData 
            })
            .then(response => {
                // Hide form and show success message
                form.classList.add('hide-form');
                if (successMessage) {
                    successMessage.classList.add('show-success');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error submitting your request. Please try again or message us on WhatsApp.');
                
                // Reset button so user can try again
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});