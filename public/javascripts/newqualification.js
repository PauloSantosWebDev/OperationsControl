//General functions - Start
async function insertQualification () {
    const qualification = document.getElementById('inputQualification').value;
    const qualificationCode = document.getElementById('inputQualificationCode').value;
    const description = document.getElementById('functionDescription').value;

    if(!qualification || !qualificationCode || !description) {
        alert("All fields required!");
        return
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({qualification, qualificationCode, description})
    };

    try {
        const response = await fetch("/newqualification", options);
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
}

// General funtions - End

//-------------------------------------------
//Event listeners - Start
document.getElementById('js-new-qualification-btn').addEventListener('click', () => {
    insertQualification();
})

//Event listeners - End