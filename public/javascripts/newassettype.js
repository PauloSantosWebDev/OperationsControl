//General functions - Start
async function insertAssetType () {
    const assetType = document.getElementById('inputAssetType').value;
    const description = document.getElementById('assetTypeDescription').value;

    if(!assetType || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({assetType, description})
    };

    try {
        const response = await fetch("/newassettype", options);
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
document.getElementById('js-new-asset-type-btn').addEventListener('click', () => {
    insertAssetType();
})

//Event listeners - End