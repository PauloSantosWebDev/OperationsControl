//General functions - Start
async function insertSupervisor () {
    const fname = document.getElementById('inputSupervisorFirstName').value;
    const lname = document.getElementById('inputSupervisorLastName').value;
    const email = document.getElementById('inputSupervisorEmail').value;
    const phone = document.getElementById('inputSupervisorPhone').value;

    if(!fname || !lname || !email || !phone) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fname, lname, email, phone})
    };

    try {
        const response = await fetch("/newsupervisor", options);
        if (response.ok) {
            const result = await response.json();
            alert (`Success: ${result.body}`);
            location.reload();
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }
}

// General funtions - End

//-------------------------------------------
//Event listeners - Start
document.getElementById('js-new-supervisor-btn').addEventListener('click', () => {
    insertSupervisor();
})

//Event listeners - End