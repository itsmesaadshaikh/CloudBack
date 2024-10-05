document.addEventListener('DOMContentLoaded', () => {
    const ticketsContainer = document.getElementById('tickets-container');
    const passengers = JSON.parse(localStorage.getItem('passengerDetails')) || [];
    const flightDetails = JSON.parse(localStorage.getItem('flightDetails')) || {};
    const source = flightDetails.from || 'N/A';
    const destination = flightDetails.to || 'N/A';
    const date = flightDetails.depart || 'N/A';
    const flightId = flightDetails.flightId || '7821056';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Dynamic time

    function generateRandomPassengerId() {
        return Math.floor(Math.random() * 1000000);
    }

    passengers.forEach((passenger, index) => {
        const passengerId = generateRandomPassengerId();
        const ticket = document.createElement('div');
        ticket.classList.add('ticket');
        ticket.innerHTML = `
            <div class="ticket-header">
                <h1 style="font-family: 'Lato', sans-serif; color: rgb(0, 105, 217);">CloudBookings.com</h1>
                <h3>Passenger ${index + 1} Ticket</h3>
                <p>Passenger ID: ${passengerId}</p>
                <p>Source: ${source}</p>
                <p>Destination: ${destination}</p>
                <p>Date: ${date}</p>
                <p>Flight ID: ${flightId}</p>
                <p>Time: ${time}</p>
            </div>
            <div class="ticket-details">
                <p>Name: ${passenger.name} ${passenger.middleName} ${passenger.lastName}</p>

                <p>Email: ${passenger.email}</p>
                <p>Phone: ${passenger.phone}</p>
                <p>Age: ${passenger.age}</p>
                <p>Passport: ${passenger.passport}</p>
            </div>
        `;
        ticketsContainer.appendChild(ticket);
    });

    document.getElementById('print-ticket').addEventListener('click', () => {
        window.print();
    });
});
