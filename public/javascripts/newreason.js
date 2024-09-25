//General functions - Start


// General funtions - End

//-------------------------------------------
//Event listeners - Start
document.getElementById('js-new-reason-btn').addEventListener('click', async () => {
    const category = document.getElementById('selectCategory').value;
    const reason = document.getElementById('inputReason').value;
    const description = document.getElementById('reasonDescription').value;

    if(!category || !reason || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category, reason, description})
    };

    try {
        const response = await fetch("/newreason", options);
        if (response.ok) {
            const result = await response.json();
            alert(`Success: ${result.body}`);
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

//Event listeners - End