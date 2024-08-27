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
    document.getElementById('formPersonnel').innerHTML = accumulator
}

//Event listener
document.getElementById('inputNumberAssets').addEventListener('change', createFields);
document.getElementById('inputNumberEmployees').addEventListener('change', createFields);