//General functions - Start
async function insertFunction () {
    const func = document.getElementById('inputFunction').value;
    const description = document.getElementById('functionDescription').value;

    if(!func || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({func, description})
    };

    try {
        const response = await fetch("/newfunction", options);
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
document.getElementById('js-new-function-btn').addEventListener('click', () => {
    insertFunction();
})

//Event listeners - End