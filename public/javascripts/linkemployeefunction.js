//Event listeners

//Link record
document.getElementById('js-link-employee-function').addEventListener('click', async () => {
    let employeeId = document.getElementById('selectEmployee').value;
    let functionId = document.getElementById('selectFunction').value;

    if(!employeeId || !functionId) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({employeeId, functionId})
    };

    try {
        const response = await fetch('/linkemployeefunction', options);
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