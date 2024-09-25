//General functions - Start

// General funtions - End

//-------------------------------------------
//Event listeners - Start
document.getElementById('js-new-asset-availability-btn').addEventListener('click', async () => {
    const assetId = document.getElementById('selectAsset').value;
    const reason = document.getElementById('selectReason').value;
    let startDate = document.getElementById('inputStartDate').value;
    let endDate = document.getElementById('inputEndDate').value;
    const description = document.getElementById('descriptionAssetAvailability').value;

    //I need to invert the date format to show dd/mm/yyyy instead of yyyy/mm/dd
    if (startDate.split('-')[0].length === 4) { //if is needed because some computer have dd/mm/yyyy as defaul and then all the inversion is unnecessary
        startDate = startDate.split('-').reverse().join('-');
        endDate = endDate.split('-').reverse().join('-');
    }

    if(!assetId || !reason || !startDate || !endDate || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({assetId, reason, startDate, endDate, description})
    };

    try {
        const response = await fetch("/availabilityasset", options);
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
})

//Event listeners - End