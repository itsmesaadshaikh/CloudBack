// Handling Return Date Display
var checkTick = document.getElementById("chkret");
var displayReturn = document.getElementById("return");

displayReturn.style.display = 'none';

checkTick.onchange = function() {
    if (checkTick.checked) {
        displayReturn.style.display = 'block';
    } else {
        displayReturn.style.display = 'none';
    }
}

// Pax Count Management
var increaseCount = document.getElementById("plus");
var decreaseCount = document.getElementById("minus");
var paxCount = document.getElementById("countpax");
var count = 1;

var popup = document.getElementById("popup");
var popupClose = document.getElementById("popup-close");

increaseCount.onclick = function(event) {
    event.preventDefault();
    count++;
    paxCount.textContent = count;
}

decreaseCount.onclick = function(event) {
    event.preventDefault();
    if (count > 1) {
        count--;
        paxCount.textContent = count;
    } else {
        popup.style.display = "block";
    }
}

popupClose.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

// Form Validation and Submission Handling
const searchForm = document.querySelector('.booking_form form');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset previous error states
    const formGroups = document.querySelectorAll('.form_group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });

    const from = document.querySelector('#from').value.trim();
    const to = document.querySelector('#to').value.trim();
    const departDate = document.querySelector('#depart-date').value.trim();
    const returnDate = document.querySelector('#return-date').value.trim();
    const passengers = parseInt(document.querySelector('#countpax').textContent.trim(), 10);
    
    // Get selected flight companies
    const companies = Array.from(document.querySelectorAll('input[name="flight-company"]:checked'))
                            .map(input => input.value);
    // Get selected travel classes
    const classes = Array.from(document.querySelectorAll('input[name="class"]:checked'))
                         .map(input => input.value);

    let hasError = false;

    if (!from) {
        document.querySelector('#from').closest('.form_group').classList.add('error');
        hasError = true;
    }

    if (!to) {
        document.querySelector('#to').closest('.form_group').classList.add('error');
        hasError = true;
    }

    if (!departDate) {
        document.querySelector('#depart-date').closest('.form_group').classList.add('error');
        hasError = true;
    }

    if (checkTick.checked && !returnDate) {
        document.querySelector('#return-date').closest('.form_group').classList.add('error');
        hasError = true;
    }

    if (passengers <= 0) {
        document.querySelector('#passengers').classList.add('error');
        hasError = true;
    }

    if (hasError) {
        alert('Please fill in all required fields correctly.');
    } else {
        // Display flight information
        document.getElementById('flightinfo').style.display = 'block';

        // Save flight details to local storage
        localStorage.setItem('flightDetails', JSON.stringify({
            from: from,
            to: to,
            depart: departDate,
            return: returnDate || 'Not Applicable',
            passengers: passengers,
            companies: companies, // Save selected flight companies
            classes: classes // Save selected travel classes
        }));
        localStorage.setItem('passengers', passengers); // Save passenger count

        // Add an event listener to the Book Flight button
        document.getElementById('bookflight').addEventListener('click', function() {
            window.location.href = 'details.html'; // Redirect to details page
        });
    }
});

// Example function to generate flight ID (replace with actual logic)
function generateFlightId() {
    return 'FLIGHT-' + Math.floor(Math.random() * 10000);
}
