//General functions - Start
async function insertLocation () {
    const csId = document.getElementById('selectCSAssetId').value;
    const client = document.getElementById('selectClient').value;
    const startDate = document.getElementById('inputStartDate').value;
    const endDate = document.getElementById('inputEndDate').value;
    const description = document.getElementById('locationDescription').value;

    if(!csId || !client || !startDate || !endDate || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({csId, client, startDate, endDate, description})
    };

    try {
        const response = await fetch("/newlocation", options);
        if (response.ok) {
            const result = await response.json();
            alert(`Success: ${result.body}`);
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
document.getElementById('js-new-location-btn').addEventListener('click', () => {
    insertLocation();
})

//Event listeners - End