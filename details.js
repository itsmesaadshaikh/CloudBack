document.addEventListener('DOMContentLoaded', () => {
    const detailsForm = document.getElementById('passenger-details-form');

    detailsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const middleName = document.getElementById('middle-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value.trim(); // Trim spaces
        const age = document.getElementById('age').value;
        const passport = document.getElementById('passport').value;

        // Remove all non-digit characters from the phone input
        phone = phone.replace(/\D/g, '');

        // Validate phone number (after removing non-digits)
        const phonePattern = /^\d{10}$/; // Regular expression to match exactly 10 digits
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Validate age
        if (age < 18) {
            alert("You must be at least 18 years old to book a flight ticket.");
            return;
        }

        // Validate passport number
        if (passport.length < 15) {
            alert("Please enter a passport number with at least 15 characters.");
            return;
        }

        // Send data to PHP script
        fetch('store_passenger_details.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, middleName, lastName, email, phone, age, passport }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Passenger details stored successfully.");
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
