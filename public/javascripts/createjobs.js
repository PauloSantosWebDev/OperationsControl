//Global variables area
let formNumber = 1;

//Functions Area

function addResourceForm () {
    const formContainer = document.getElementById('resourceContainer');
    formNumber += 1;

    // Subtitle for the form
    const subtitle = document.createElement('h4');
    subtitle.style.color = 'black';
    subtitle.style.fontWeight = 'bold';
    subtitle.textContent = `Resource - ${formNumber}`;
    formContainer.appendChild(subtitle);

    // Create form element
    const newForm = document.createElement('form');
    newForm.className = 'row g-3 needs-validation';
    newForm.noValidate = true;

    // Start Date Field
    createInputField(newForm, 'Start Date', 'inputStart', 'col-md-3', 'date', 'taskDates');

    // End Date Field
    createInputField(newForm, 'End Date', 'inputEndDate', 'col-md-3', 'date', 'taskDates');

    // Filler (hidden label)
    const fillerDiv = document.createElement('div');
    fillerDiv.className = 'col-md-6';
    const fillerLabel = document.createElement('label');
    fillerLabel.hidden = true;
    fillerDiv.appendChild(fillerLabel);
    newForm.appendChild(fillerDiv);

    // Start and End Time - Yard and Site
    createSelectField(newForm, 'Yard Start', 'inputStartYard', 'col-md-3', 'taskTimes', 'ys');
    createSelectField(newForm, 'Site Start', 'inputStartSite', 'col-md-3', 'taskTimes', 'ss');
    createSelectField(newForm, 'Site Finish', 'inputFinishSite', 'col-md-3', 'taskTimes', 'sf');
    createSelectField(newForm, 'Yard Finish', 'inputFinishYard', 'col-md-3', 'taskTimes', 'yf');

    // Asset Field (dynamic options can be loaded here)
    createDynamicSelect(newForm, 'Asset', 'inputAsset', 'col-md-3', 'taskAsset', 'Asset');

    // Number of Riggers
    createSelectRiggers(newForm, 'Number of Riggers', 'inputNumberRiggers', 'col-md-3', 'taskRiggers');

    // Text Areas
    createTextArea(newForm, 'Lifting Equipment and man cages', 'liftingEquipmentManCages', 'liftingEquipment', 'Please describe lifting equipment and man cages required for this task.');
    createTextArea(newForm, 'Counterweight and bog mats', 'counterweightBogMats', 'cwt', 'Please describe counterweight and bog mats required for this task.');
    createTextArea(newForm, 'Extra information', 'extraInfo', 'extra', 'Please add extra information for this task.');

    // Append the complete form to the container
    formContainer.appendChild(newForm);
}

// Function to create input fields
function createInputField(form, labelText, id, colClass, type, inputClass) {
    const div = document.createElement('div');
    div.className = colClass;

    const label = document.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', id);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.className = `form-control ${inputClass}`;

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
}

// Function to create select fields with time options
function createSelectField(form, labelText, id, colClass, selectClass, prefix) {
    const div = document.createElement('div');
    div.className = colClass;

    const label = document.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', id);
    label.textContent = labelText;

    const select = document.createElement('select');
    select.className = `form-select ${selectClass}`;

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Choose...';
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    generateTimeOptions(prefix).forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.label;
        select.appendChild(option);
    });

    div.appendChild(label);
    div.appendChild(select);
    form.appendChild(div);
}

// Function to create dynamically populated select fields
function createDynamicSelect(form, labelText, id, colClass, selectClass, placeholder) {
    const div = document.createElement('div');
    div.className = colClass;

    const label = document.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', id);
    label.textContent = labelText;

    const select = document.createElement('select');
    select.className = `form-select ${selectClass}`;
    
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);

    div.appendChild(label);
    div.appendChild(select);
    form.appendChild(div);
}

// Function to create a select field for the number of riggers
function createSelectRiggers(form, labelText, id, colClass, selectClass) {
    const div = document.createElement('div');
    div.className = colClass;

    const label = document.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', id);
    label.textContent = labelText;

    const select = document.createElement('select');
    select.className = `form-select ${selectClass}`;

    for (let i = 0; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    div.appendChild(label);
    div.appendChild(select);
    form.appendChild(div);
}

// Function to create a text area field
function createTextArea(form, labelText, id, textAreaClass, placeholder) {
    const div = document.createElement('div');
    div.className = 'mb-3';

    const label = document.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', id);
    label.textContent = labelText;

    const textArea = document.createElement('textarea');
    textArea.className = `form-control ${textAreaClass}`;
    textArea.rows = 3;
    textArea.placeholder = placeholder;

    div.appendChild(label);
    div.appendChild(textArea);
    form.appendChild(div);
}

// Helper function to generate time options for select elements
function generateTimeOptions(prefix) {
    const times = [];
    for (let i = 0; i < 24; i++) {
        if (i < 12) {
            times.push({ value: `${prefix}${i}00`, label: `${i}:00am` });
            times.push({ value: `${prefix}${i}30`, label: `${i}:30am` });
        } else if (i === 12) {
            times.push({ value: `${prefix}${i}00`, label: `${i}:00pm` });
            times.push({ value: `${prefix}${i}30`, label: `${i}:30pm` });
        } else {
            times.push({ value: `${prefix}${i}00`, label: `${i % 12}:00pm` });
            times.push({ value: `${prefix}${i}30`, label: `${i % 12}:30pm` });
        }
    }
    return times;
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


//Event listeners area
//--------------------------------------------------------------------------------------------------------


// Listener to add new resources when btn is clicked
document.getElementById('btnAddNewTask').addEventListener('click', addResourceForm);

document.querySelectorAll(".taskAsset").forEach((e, i) => {
    e.addEventListener('click', () =>{
        document.querySelectorAll('.taskTimes').forEach((e2, i2) => {
            if (i2 == 4 * i || i2 == 4 * i + 1 || i2 == 4 * i + 2 || i2 == 4 * i + 3 ) {
                if (e2.value == "Choose...") {
                    alert("Dates and times required.")
                }
            }
        })
    })
})



