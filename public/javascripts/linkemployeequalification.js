//Event listeners

//Link records
document.getElementById('js-link-employee-qualification').addEventListener('click', async () => {
    let employeeId = document.getElementById('selectEmployee').value;
    let qualificationId = document.getElementById('selectQualification').value;
    let expire = document.getElementById('inputExpireDate').value;

    if (expire.split('-')[0].length === 4){
        expire = expire.split('-').reverse().join('-');
    }

    if(!employeeId || !qualificationId || !expire) {
        alert("FAILED! All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({employeeId, qualificationId, expire})
    };

    try {
        const response = await fetch('/linkemployeequalification', options);
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

//Unlink records
document.querySelectorAll('.unlinkbtn').forEach(e => {
    e.addEventListener('click', async () => {
        const path = 'unlink';
        const employee = e.value.split('-')[0];
        const q = e.value.split('-')[1];

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({path, employee, q})
        };
    
        try {
            const response = await fetch('/linkemployeequalification', options);
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
})