let executionPath = "show";

async function loadTable () {
    let selectFunction = document.getElementById('selectFunction').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectFunction, executionPath})
    };

    try {
        const response = await fetch('/upddelfunction', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputFunction').value = result.body.function;
            document.getElementById('functionDescription').value = result.body.description;
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
document.getElementById('selectFunction').addEventListener('change', () => {
    loadTable();
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let selectFunction = document.getElementById('selectFunction').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectFunction, executionPath})
    };

    try {
        const response = await fetch('/upddelfunction', options);
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
    let selectFunction = document.getElementById('selectFunction').value;
    let executionPath = "update";
    let functionDetail = document.getElementById('inputFunction').value;
    let description = document.getElementById('functionDescription').value;

    if(!functionDetail || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectFunction, executionPath, functionDetail, description})
    };

    try {
        const response = await fetch('/upddelfunction', options);
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