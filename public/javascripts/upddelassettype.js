let executionPath = "show";

//Event listeners

//Select and show desired data
document.getElementById('selectAssetType').addEventListener('change', async () => {
    let selectAssetType = document.getElementById('selectAssetType').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectAssetType, executionPath})
    };

    try {
        const response = await fetch('/upddelassettype', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputAssetType').value = result.body.assetType;
            document.getElementById('assetTypeDescription').value = result.body.description;
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
    let selectAssetType = document.getElementById('selectAssetType').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectAssetType, executionPath})
    };

    try {
        const response = await fetch('/upddelassettype', options);
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
    let selectAssetType = document.getElementById('selectAssetType').value;
    let executionPath = "update";
    let assetType = document.getElementById('inputAssetType').value;
    let description = document.getElementById('assetTypeDescription').value;

    if(!assetType || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({assetType, description, executionPath, selectAssetType})
    };

    try {
        const response = await fetch('/upddelassettype', options);
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