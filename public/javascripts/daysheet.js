// Function to display the selected date
function displayDate() {
    const inputDate = document.getElementById('datePicker').value;

    if (inputDate) {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        document.getElementById('selectedDate').textContent = formattedDate;
    } else {
        document.getElementById('selectedDate').textContent = "Please select a date.";
    }
}

// Add an event listener to the date picker input
document.getElementById('datePicker').addEventListener('change', displayDate);

//--------------------------------------------------------------------------------------------------------
//Fuction to automatically add the assets and crews' dropdown fields


//Function to create assets' availability summary
function assetAvailabilitySummary (body) {
    const container = document.getElementById('summaryAssetsAvailability');
        
    let htmlAccumulator = "";

    for (let i = 0; i < 5; i++) {
        let optionText = document.querySelectorAll('.assetAndDate')[3*i].options[document.querySelectorAll('.assetAndDate')[3*i].selectedIndex].textContent;
        if (!optionText) {
            break;
        }
        if (body[i].length === 0) {
            htmlAccumulator = htmlAccumulator + `<p style="color: green;">${optionText} - Is Available</p>
            <hr>`
        } else {
            let dates = [];
            body[i].forEach(e => dates.push(e.date));
            // let strDates = dates.join(",");
            dates = dates.map(e => e.split('-').reverse().join('-'));
            let strDates = dates.join(', ');
             htmlAccumulator = htmlAccumulator + `<p style="color: red;">${optionText} - Not available</p>
             <p>${strDates}</p>
             <hr>`
        }
    }
    container.innerHTML = htmlAccumulator;
}

//Function to restart assets check availability
function restartAssetsCheckAvailabilityForm () {
    document.querySelectorAll(".assetAndDate").forEach((e, i) => {
        e.value = "";
        if (i > 2) {
            e.disabled = true;
        }
    });
}

//Function to run assets' availability check
async function checkAvailability () {
    const assetsAndDatesToCheck = [];
    const assetsAndDatesToCheckObj = [];
    let countNotEmpty = 0;
    let formReadyToSend = true;
    document.querySelectorAll(".assetAndDate").forEach(e => {
        if (e.value) {
            countNotEmpty++;
        }
    });
    document.querySelectorAll(".assetAndDate").forEach((e, i) => { //this part is just to make sure the form doesn't have filled rows after empty ones.
        if (i >= countNotEmpty) { //this if makes sure only the initial indexes are considered.
            return
        } 
        if (!e.value) { //this if the index one checks if the information is not following the flow it should
            formReadyToSend = false;
        }
    });

    if (countNotEmpty <=2) { //This if is to make sure the first row cannot be enough to be submited if empty
        alert('Please make sure at least one row is completely filled.');
        return
    }

    if (!formReadyToSend) {
        alert('Ensure there are no empty fields before any filled ones.')
        return
    }
    
    document.querySelectorAll(".assetAndDate").forEach(e => assetsAndDatesToCheck.push(e.value));
    for (let i = 0; i < assetsAndDatesToCheck.length; i+= 3) {
        if (assetsAndDatesToCheck[i + 1] > assetsAndDatesToCheck[i + 2]) {
            alert('Please ensure the start time is earlier than the end time.');
            return;
        }
        if (!assetsAndDatesToCheck[i + 1] || !assetsAndDatesToCheck[i + 2]) {
            continue;
        }
        assetsAndDatesToCheckObj.push({asset: assetsAndDatesToCheck[i], startDate: assetsAndDatesToCheck[i + 1], endDate: assetsAndDatesToCheck[i + 2]});
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({assetsAndDatesToCheckObj})
    };

    try {
        const response = await fetch("/", options);
        if (response.ok) {
            const result = await response.json();
            assetAvailabilitySummary(result.body);
            restartAssetsCheckAvailabilityForm();
            document.getElementById('btnAvailabilityCheckSummary').click();
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data from asset_taken.');
    }
}

//Function to keep track and allow changes in the check asset availability fields
function allowChangeCheckAvailability () {
    let countNotEmpty = 0;
    document.querySelectorAll(".assetAndDate").forEach(e => {
        if (e.value) {
            countNotEmpty++;
        }
    });
    
    if (countNotEmpty % 3 === 0) {
        for (let i = 0; i < 3; i++) {
            document.querySelectorAll(".assetAndDate")[countNotEmpty+i].disabled = false;
        }
    }
}

//Event listener
// document.getElementById('inputNumberAssets').addEventListener('change', createFields);
// document.getElementById('inputNumberEmployees').addEventListener('change', createFields);
// document.getElementById('btnAllocationAssets').addEventListener('click', createFields);
// document.getElementById('btnAllocationPersonnel').addEventListener('click', createFields);
document.getElementById('btnAvailabilityCheck').addEventListener('click', checkAvailability);

document.querySelectorAll(".assetAndDate").forEach((e, index) => {
    if (index === 0 || index === 1 || index === 2) {
        e.disabled = false;
    }
    e.addEventListener('change', allowChangeCheckAvailability);
});

document.getElementById('btnCheckAvailability').addEventListener('click', restartAssetsCheckAvailabilityForm);

document.getElementById('btnCreateJobs').addEventListener('click', () => {
    window.location.pathname = '/createjobs'
});