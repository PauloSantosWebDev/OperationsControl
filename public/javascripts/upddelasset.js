async function loadTable () {
    let asset = document.getElementById('selectAsset').value;

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({asset})
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

//Event listener
document.getElementById('selectAsset').addEventListener('change', () =>{
    loadTable();
})
