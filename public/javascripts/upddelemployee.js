let executionPath = "show";

//Event listeners

//Select and show desired data
document.getElementById('selectEmployee').addEventListener('change', async () => {
    let employee = document.getElementById('selectEmployee').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({employee, executionPath})
    };

    try {
        const response = await fetch('/upddelemployee', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputEmployeeFirstName').value = result.body.firstName;
            document.getElementById('inputEmployeeLastName').value = result.body.lastName;
            document.getElementById('inputEmployeeEmail').value = result.body.email;
            document.getElementById('inputEmployeePhone').value = result.body.phone;
            document.getElementById('inputAddress').value = result.body.address;
            document.getElementById('inputSuburb').value = result.body.suburb;
            document.getElementById('inputPostcode').value = result.body.postcode;
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }

    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let employee = document.getElementById('selectEmployee').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({employee, executionPath})
    };

    try {
        const response = await fetch('/upddelemployee', options);
        if (response.ok) {
            const result = await response.json();
            alert(result.body);
            location.reload();
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }

    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }
})

//Update record
document.getElementById('js-update-record').addEventListener('click', async () => {
    let employee = document.getElementById('selectEmployee').value;
    let executionPath = "update";

    const firstName = document.getElementById('inputEmployeeFirstName').value;
    const lastName = document.getElementById('inputEmployeeLastName').value;
    const email = document.getElementById('inputEmployeeEmail').value;
    const phone = document.getElementById('inputEmployeePhone').value;
    const address = document.getElementById('inputAddress').value;
    const suburb = document.getElementById('inputSuburb').value;
    const postcode = document.getElementById('inputPostcode').value;

    if(!firstName || !lastName || !email || !phone || !address || !suburb || !postcode) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email, phone, address, suburb, postcode, employee, executionPath})
    };

    try {
        const response = await fetch('/upddelemployee', options);
        if (response.ok) {
            const result = await response.json();
            alert(result.body);
            location.reload();
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }

    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }
})