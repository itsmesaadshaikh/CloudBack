document.addEventListener('DOMContentLoaded', () => {
    const confirmationDetails = document.querySelector('#confirmation-details');
    const confirmBtn = document.getElementById('confirm-btn');

    const flightDetails = JSON.parse(localStorage.getItem('flightDetails'));

    if (flightDetails) {
        confirmationDetails.innerHTML = `
            <li>From: ${flightDetails.from}</li>
            <li>To: ${flightDetails.to}</li>
            <li>Depart Date: ${flightDetails.depart}</li>
            <li>Return Date: ${flightDetails.return}</li>
            <li>Passengers: ${flightDetails.passengers}</li>
        `;
    } else {
        confirmationDetails.innerHTML = '<p>No booking details found.</p>';
    }

    confirmBtn.addEventListener('click', () => {
        window.location.href = 'details.html'; // Redirect to details page
    });
});
