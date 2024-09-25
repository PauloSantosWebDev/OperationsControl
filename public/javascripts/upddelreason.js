let executionPath = "show";

async function loadTable () {
    let selectRegister = document.getElementById('selectRegister').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectRegister, executionPath})
    };

    try {
        const response = await fetch('/upddelreason', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('selectCategory').value = result.body.category;
            document.getElementById('inputReason').value = result.body.reason;
            document.getElementById('reasonDescription').value = result.body.description;
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
    let selectRegister = document.getElementById('selectRegister').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectRegister, executionPath})
    };

    try {
        const response = await fetch('/upddelreason', options);
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
    let selectRegister = document.getElementById('selectRegister').value;
    let executionPath = "update";
    let category = document.getElementById('selectCategory').value;
    let reason = document.getElementById('inputReason').value;
    let description = document.getElementById('reasonDescription').value;

    if(!category || !reason || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category, reason, description, selectRegister, executionPath})
    };

    try {
        const response = await fetch('/upddelreason', options);
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