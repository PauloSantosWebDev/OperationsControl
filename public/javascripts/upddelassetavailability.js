let executionPath = "show";

async function loadTable () {
    let register = document.getElementById('selectRegister').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({register, executionPath})
    };

    try {
        const response = await fetch('/upddelassetsavailability', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('selectAsset').value = result.body.asset;
            document.getElementById('selectReason').value = result.body.reason;
            if (result.body.startDate.split('-')[2].length === 4) {
                document.getElementById('inputStartDate').value = result.body.startDate.split('-').reverse().join('-');
                document.getElementById('inputEndDate').value = result.body.endDate.split('-').reverse().join('-');
            } else {
                document.getElementById('inputStartDate').value = result.body.startDate;
                document.getElementById('inputEndDate').value = result.body.endDate;
            }
            document.getElementById('descriptionAssetAvailability').value = result.body.description;
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }

    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }
}

//Event listeners

//Select and show desired data
document.getElementById('selectRegister').addEventListener('change', () => {
    loadTable();
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let register = document.getElementById('selectRegister').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({register, executionPath})
    };

    try {
        const response = await fetch('/upddelassetsavailability', options);
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
    let register = document.getElementById('selectRegister').value;
    let executionPath = "update";
    let asset = document.getElementById('selectAsset').value;
    let reason = document.getElementById('selectReason').value;
    let startDate = document.getElementById('inputStartDate').value;
    let endDate = document.getElementById('inputEndDate').value;
    let description = document.getElementById('descriptionAssetAvailability').value;
    
    //I need to invert the date format to show dd/mm/yyyy instead of yyyy/mm/dd
    if (startDate.split('-')[0].length === 4) { //if is needed because some computer have dd/mm/yyyy as defaul and then all the inversion is unnecessary
        const invertedStartDate = startDate.split('-').reverse().join('-');
        const invertedEndDate = endDate.split('-').reverse().join('-');
        startDate = invertedStartDate;
        endDate = invertedEndDate;
    }

    if(!asset ||!reason || !startDate || !endDate || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({register, executionPath, asset, reason, startDate, endDate, description})
    };

    try {
        const response = await fetch('/upddelassetsavailability', options);
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