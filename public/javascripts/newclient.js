//General functions - Start
async function insertClient() {
    const clientName = document.getElementById('inputClientName').value;
    const email = document.getElementById('inputClientEmail').value;
    const phone = document.getElementById('inputClientPhone').value;
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('inputState').value;
    const postcode = document.getElementById('inputPostcode').value;

    if(!clientName || !email || !phone || !address || !city || !state || !postcode) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({clientName, email, phone, address, city, state, postcode})
    };

    try {
        const response = await fetch("/newclient", options);
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
document.getElementById('js-new-client-btn').addEventListener('click', () => {
    insertClient();
})

//Event listeners - End