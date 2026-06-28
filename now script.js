document.addEventListener('DOMContentLoaded', () => {
    const addPassengerBtn = document.getElementById('add-passenger');
    const passengerContainer = document.getElementById('passenger-container');
    const form = document.getElementById('tatkalForm');
    const successMessage = document.getElementById('success-message');

    // Add new passenger row
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

    // Form Submission Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(form);
        
        // IMPORTANT: Ensure your actual Google Web App URL is pasted here!
        const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; 

        // Test Mode Simulation (runs if you haven't added your link yet)
        if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            setTimeout(() => {
                // Hide the form and show the success message
                form.classList.add('hide-form');
                successMessage.classList.add('show-success');
            }, 1500);
            return;
        }

        // Live Mode: Send data to Google Sheet
        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                // Hide the form and show the success message
                form.classList.add('hide-form');
                successMessage.classList.add('show-success');
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error submitting your form. Please try again or message us directly on WhatsApp.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            });
    });
});