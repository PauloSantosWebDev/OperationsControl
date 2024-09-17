let executionPath = "show";

async function loadTable () {
    let asset = document.getElementById('selectAsset').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({asset, executionPath})
    };

    try {
        const response = await fetch('/upddelasset', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputCSAssetId').value = result.body.csId;
            document.getElementById('inputAssetName').value = result.body.assetName;
            document.getElementById('selectAssetType').value = result.body.assetType;
            document.getElementById('assetDescription').value = result.body.description;
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
document.getElementById('selectAsset').addEventListener('change', () => {
    loadTable();
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let asset = document.getElementById('selectAsset').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({asset, executionPath})
    };

    try {
        const response = await fetch('/upddelasset', options);
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
    let asset = document.getElementById('selectAsset').value;
    let executionPath = "update";
    let csId = document.getElementById('inputCSAssetId').value;
    let assetName = document.getElementById('inputAssetName').value;
    let assetType = document.getElementById('selectAssetType').value;
    let description = document.getElementById('assetDescription').value;

    if(!csId || !assetName || !assetType || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({asset, executionPath, csId, assetName, assetType, description})
    };

    try {
        const response = await fetch('/upddelasset', options);
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