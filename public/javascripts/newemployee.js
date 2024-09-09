//General functions - Start
async function insertEmployees () {
    const fname = document.getElementById('inputEmployeeFirstName').value;
    const lname = document.getElementById('inputEmployeeLastName').value;
    const email = document.getElementById('inputEmployeeEmail').value;
    const phone = document.getElementById('inputEmployeePhone').value;
    const address = document.getElementById('inputAddress').value;
    const suburb = document.getElementById('inputSuburb').value;
    const postcode = document.getElementById('inputPostcode').value;

    if(!fname || !lname || !email || !phone || !address || !suburb || !postcode) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fname, lname, email, phone, address, suburb, postcode})
    };

    try {
        const response = await fetch("/newemployee", options);
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
document.getElementById('js-new-employee-btn').addEventListener('click', () => {
    insertEmployees();
})

//Event listeners - End