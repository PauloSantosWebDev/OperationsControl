let executionPath = "show";

async function loadTable () {
    let selectQualification = document.getElementById('selectQualification').value;
    executionPath = "show";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectQualification, executionPath})
    };

    try {
        const response = await fetch('/upddelqualification', options);
        if (response.ok) {
            const result = await response.json();
            document.getElementById('inputQualification').value = result.body.qualification;
            document.getElementById('inputQualificationCode').value = result.body.qualificationCode;
            document.getElementById('qualificationDescription').value = result.body.description;
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
document.getElementById('selectQualification').addEventListener('change', () => {
    loadTable();
})

//Delete record
document.getElementById('js-delete-record').addEventListener('click', async () => {
    let selectQualification = document.getElementById('selectQualification').value;
    let executionPath = "delete";

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectQualification, executionPath})
    };

    try {
        const response = await fetch('/upddelqualification', options);
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
    let selectQualification = document.getElementById('selectQualification').value;
    let executionPath = "update";
    let qualification = document.getElementById('inputQualification').value;
    let qualificationCode = document.getElementById('inputQualificationCode').value;
    let description = document.getElementById('qualificationDescription').value;

    if(!qualification || !qualificationCode || !description) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({qualification, qualificationCode, description, selectQualification, executionPath})
    };

    try {
        const response = await fetch('/upddelqualification', options);
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