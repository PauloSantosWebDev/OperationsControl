//General functions - Start
async function insertAssets () {
    const craneServicesId = document.getElementById('inputCSAssetId').value;
    const assetName = document.getElementById('inputAssetName').value;
    const assetType = document.getElementById('selectAssetType').value;
    const description = document.getElementById('assetDescription').value;

    if(!craneServicesId || !assetName || !assetType || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({craneServicesId, assetName, assetType, description})
    };

    try {
        const response = await fetch("/newasset", options);
        if (response.ok) {
            const result = await response.json();
            alert(`Success: ${result.body}`);
            // document.getElementById('inputCSAssetId').value = '';
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
document.getElementById('js-new-asset-btn').addEventListener('click', () => {
    insertAssets();
})

//Event listeners - End