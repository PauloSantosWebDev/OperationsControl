let executionPath = "show";

async function loadTable () {
    let selectSupervisor = document.getElementById('selectSupervisor').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectSupervisor, executionPath})
    };

    try {
        const response = await fetch('/upddelsupervisor', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputSupervisorFirstName').value = result.body.firstName;
            document.getElementById('inputSupervisorLastName').value = result.body.lastName;
            document.getElementById('inputSupervisorEmail').value = result.body.email;
            document.getElementById('inputSupervisorPhone').value = result.body.phone;
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
document.getElementById('selectSupervisor').addEventListener('change', () => {
    loadTable();
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let selectSupervisor = document.getElementById('selectSupervisor').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectSupervisor, executionPath})
    };

    try {
        const response = await fetch('/upddelsupervisor', options);
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
    let selectSupervisor = document.getElementById('selectSupervisor').value;
    let executionPath = "update";
    let firstName = document.getElementById('inputSupervisorFirstName').value;
    let lastName = document.getElementById('inputSupervisorLastName').value;
    let email = document.getElementById('inputSupervisorEmail').value;
    let phone = document.getElementById('inputSupervisorPhone').value;

    if(!firstName || !lastName || !email || !phone) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectSupervisor, executionPath, firstName, lastName, email, phone})
    };

    try {
        const response = await fetch('/upddelsupervisor', options);
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