let executionPath = "show";

//Event listeners

//Select and show desired data
document.getElementById('selectClient').addEventListener('change', async () => {
    let client = document.getElementById('selectClient').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({client, executionPath})
    };

    try {
        const response = await fetch('/upddelclient', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputClientName').value = result.body.clientName;
            document.getElementById('inputClientEmail').value = result.body.email;
            document.getElementById('inputClientPhone').value = result.body.phone;
            document.getElementById('inputAddress').value = result.body.address;
            document.getElementById('inputCity').value = result.body.city;
            document.getElementById('selectState').value = result.body.state;
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
    let client = document.getElementById('selectClient').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({client, executionPath})
    };

    try {
        const response = await fetch('/upddelclient', options);
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
    let client = document.getElementById('selectClient').value;
    let executionPath = "update";

    const clientName = document.getElementById('inputClientName').value;
    const email = document.getElementById('inputClientEmail').value;
    const phone = document.getElementById('inputClientPhone').value;
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('selectState').value;
    const postcode = document.getElementById('inputPostcode').value;

    if(!clientName || !email || !phone || !address || !city || !state || !postcode) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({clientName, email, phone, address, city, state, postcode, client, executionPath})
    };

    try {
        const response = await fetch('/upddelclient', options);
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