// Function to display the selected date
function displayDate() {
    const inputDate = document.getElementById('datePicker').value;

    if (inputDate) {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        document.getElementById('selectedDate').textContent = formattedDate;
    } else {
        document.getElementById('selectedDate').textContent = "Please select a date.";
    }
}

// Add an event listener to the date picker input
document.getElementById('datePicker').addEventListener('change', displayDate);