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
function createFields() {
    let qAssets = document.getElementById('inputNumberAssets').value;
    let qPersonnel = document.getElementById('inputNumberEmployees').value;
    // console.log(`The quantity of assets is: ${qAssets}`)
    AssetPersonnelFields(qAssets, qPersonnel);
}

function AssetPersonnelFields(qAssets = 0, qPersonnel = 0) {
    let accumulator = "";
    for(let i = 0; i < qAssets; i++){
        accumulator = accumulator +
        `<div class="col-md-12">
            <label for="inputAssets${i + 1}" class="form-label">Asset - ${i + 1}</label>
            <select id="inputAssets${i + 1}" class="form-select">
                <option>working</option>
            </select>
        </div>`    
    }  
    document.getElementById('formAsset').innerHTML = accumulator;

    accumulator = "";

    for(let i = 0; i < qPersonnel; i++) {
        accumulator = accumulator +
        `<div class="col-md-12">
            <label for="inputPersonnel${i + 1}" class="form-label">Personnel - ${i + 1}</label>
            <select id="inputPersonnel${i + 1}" class="form-select">
                <option>working</option>
            </select>
        </div>`
    }
    document.getElementById('formPersonnel').innerHTML = accumulator;
    return
}

//Function to run assets' availability check
async function checkAvailability () {
    const assetsAndDatesToCheck = [];
    const assetsAndDatesToCheckObj = [];
    document.querySelectorAll(".assetAndDate").forEach(e => assetsAndDatesToCheck.push(e.value));
    for (let i = 0; i < assetsAndDatesToCheck.length; i+= 3) {
        if (assetsAndDatesToCheck[i + 1] > assetsAndDatesToCheck[i + 2]) {
            alert('Please ensure the start time is earlier than the end time.');
            break;
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
            alert (`Success: ${result.body}`);
            location.reload();
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.body}`);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert('There was an error fetching the data.');
    }


    
    alert(assetsAndDatesToCheckObj[0].asset);
    alert('Data ready to send to server. Line 66 of daysheet.js');
}

//Event listener
// document.getElementById('inputNumberAssets').addEventListener('change', createFields);
// document.getElementById('inputNumberEmployees').addEventListener('change', createFields);
document.getElementById('btnAllocationAssets').addEventListener('click', createFields);
document.getElementById('btnAllocationPersonnel').addEventListener('click', createFields);
document.getElementById('btnAvailabilityCheck').addEventListener('click', checkAvailability);

