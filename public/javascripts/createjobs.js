//Functions Area
let accumulator = "", resourceNumber = 2;

// function addTaskFields() {
//     accumulator = document.getElementById('tasksContainer').innerHTML;
//     accumulator = accumulator + `<h4 style="color: black; font-weight: bold;">Resource - ${resourceNumber}</h4>
//             <form class="row g-3 needs-validation" novalidate>
//                 <div class="col-md-3">
//                     <label for="inputStart" class="form-label">Start Date</label>
//                     <input type="date" class="form-control" class="taskDates">
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputEndDate" class="form-label">End Date</label>
//                     <input type="date" class="form-control" class="taskDates">
//                 </div>
//                 <div class="col-md-6">
//                     <label hidden>Filler</label>
//                 </div>
//                 <!--Start and end time - Yard and Site-->
//                 <div class="col-md-3">
//                     <label for="inputStartYard" class="form-label">Yard Start</label>
//                     <select class="form-select" class="taskTimes">
//                         <option selected>Choose...</option>
//                         {% for i in range(0, 24) %}
//                             {% if i < 12 %}
//                                 <option>{{i}}:00am</option>
//                                 <option>{{i}}:30am</option>
//                             {% else %}
//                                 <option>{{i % 24}}:00pm</option>
//                                 <option>{{i % 24}}:30pm</option>
//                             {% endif %}
//                         {% endfor %}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputStartSite" class="form-label">Site Start</label>
//                     <select class="form-select" class="taskTimes">
//                         <option selected>Choose...</option>
//                         {% for i in range(0, 24) %}
//                             {% if i < 12 %}
//                                 <option>{{i}}:00am</option>
//                                 <option>{{i}}:30am</option>
//                             {% else %}
//                                 <option>{{i % 24}}:00pm</option>
//                                 <option>{{i % 24}}:30pm</option>
//                             {% endif %}
//                         {% endfor %}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputFinishSite" class="form-label">Site Finish</label>
//                     <select class="form-select" class="taskTimes">
//                         <option selected>Choose...</option>
//                         {% for i in range(0, 24) %}
//                             {% if i < 12 %}
//                                 <option>{{i}}:00am</option>
//                                 <option>{{i}}:30am</option>
//                             {% else %}
//                                 <option>{{i % 24}}:00pm</option>
//                                 <option>{{i % 24}}:30pm</option>
//                             {% endif %}
//                         {% endfor %}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputFinishYard" class="form-label">Yard Finish</label>
//                     <select class="form-select" class="taskTimes">
//                         <option selected>Choose...</option>
//                         {% for i in range(0, 24) %}
//                             {% if i < 12 %}
//                                 <option>{{i}}:00am</option>
//                                 <option>{{i}}:30am</option>
//                             {% else %}
//                                 <option>{{i % 24}}:00pm</option>
//                                 <option>{{i % 24}}:30pm</option>
//                             {% endif %}
//                         {% endfor %}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputAsset1" class="form-label">Asset</label>
//                     <select class="form-select" class="taskAsset">
//                         <option>Asset</option>
//                         {# {% for opt in toParse %}
//                             <option value="{{opt.assetType}}">{{opt.assetType}}</option>
//                         {% endfor %} #}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputDriver1" class="form-label">Driver</label>
//                     <select class="form-select" class="taskDriver">
//                         <option>Driver</option>
//                         {# {% for opt in toParse %}
//                             <option value="{{opt.assetType}}">{{opt.assetType}}</option>
//                         {% endfor %} #}
//                     </select>
//                 </div>
//                 <div class="col-md-3">
//                     <label for="inputNumberRiggers" class="form-label">Number of Riggers</label>
//                     <select class="form-select" class="taskRiggers">`
//                         let options = "";
//                         for (let i = 1; i <=10; i++) {
//                             options = options + `<option value=${i}>${i}</option>`;
//                         }
//                         alert(options);
//                         // {% for opt in range(1, 11) %}
//                         //     <option value="{{opt}}">{{opt}}</option>
//                         // {% endfor %}
//                     `${options}
//                     </select>
//                 </div>
//                 <div class="mb-3" style="margin-bottom: 0px; margin-top: 20px;">
//                     <label for="liftingEquipmentManCages1" class="form-label">Lifting Equipment and man cages</label>
//                     <textarea class="form-control" class="liftingEquipment" rows="3" placeholder="Please describe lifting equipment and man cages required for this task."></textarea>
//                 </div>
//                 <div class="mb-3" style="margin-bottom: 0px; margin-top: 0px;">
//                     <label for="counterweightBogMats1" class="form-label">Counterweight and bog mats</label>
//                     <textarea class="form-control" class="cwt" rows="3" placeholder="Please describe counterweight and bog mats required for this task."></textarea>
//                 </div>
//                 <div class="mb-3" style="margin-bottom: 0px; margin-top: 0px;">
//                     <label for="extraInfo" class="form-label">Extra information</label>
//                     <textarea class="form-control" class="extra" rows="3" placeholder="Please add extra information for this task."></textarea>
//                 </div>
//             </form>`
//     document.getElementById('tasksContainer').innerHTML = accumulator;
//     resourceNumber++;
// }

function addResourceForm () {
    // let formNumber = 2;
    // const formContainer = document.getElementById('resourceContainer');

    // const newForm = document.createElement('form');
    // newForm.className = 'row g-3 needs-validation';
    // const subtitle = document.createElement('h4');
    // subtitle.style = 'color: black; font-weight: bold;';
    // subtitle.innerHTML = `Resource - ${formNumber}`;
    // newForm.appendChild(subtitle);
    // const divStartDate = document.createElement('div');
    // divStartDate.className = 'col-md-3';
    // const labelStartDate = document.createElement('label');
    // labelStartDate.className = 'form-label';
    // labelStartDate.innerHTML = 'Start Date';
    // const inputStartDate = document.createElement('input');
    // inputStartDate.type = 'date';
    // inputStartDate.className = 'form-control';

    // divStartDate.appendChild(labelStartDate);
    // divStartDate.appendChild(inputStartDate);
    // newForm.appendChild(divStartDate);

    // const divEndDate = document.createElement('div');
    // divEndDate.className = 'col-md-3';
    // const labelEndDate = document.createElement('label');
    // labelEndDate.className = 'form-label';
    // labelEndDate.innerHTML = 'End Date';
    // const inputEndDate = document.createElement('input');
    // inputEndDate.type = 'date';
    // inputEndDate.className = 'form-control';

    // divEndDate.appendChild(labelEndDate);
    // divEndDate.appendChild(inputEndDate);
    // newForm.appendChild(divEndDate);

    // const divDatesFiller = document.createElement('div');
    // divDatesFiller.className = 'col-md-6';
    // const labelDatesFiller = document.createElement('div');
    // labelDatesFiller.innerHTML = 'Filler';
    // labelDatesFiller.hidden = true;

    // divDatesFiller.appendChild(labelDatesFiller);
    // newForm.appendChild(divDatesFiller);

    // const divYardStart = document.createElement('div');
    // divYardStart.className = 'col-md-3';
    // const labelYardStart = document.createElement('label');
    // labelYardStart.className = 'form-label';
    // labelYardStart.innerHTML = 'End Date';
    // const selectYardStart = document.createElement('select');
    // selectYardStart.className = 'form-select taskTimes';
    // const optionYardStart = document.createElement('option');
    // optionYardStart.value = 'test';
    // optionYardStart.textContent = 'test';
    
    // selectYardStart.appendChild(optionYardStart);
    // divYardStart.appendChild(labelYardStart);
    // divYardStart.appendChild(selectYardStart);

    // formContainer.appendChild(newForm);
    
    const formContainer = document.getElementById('resourceContainer');
    const formNumber = formContainer.childElementCount + 1;

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
    createDynamicSelect(newForm, 'Asset', 'inputAsset1', 'col-md-3', 'taskAsset', 'Asset');

    // Driver Field (dynamic options can be loaded here)
    createDynamicSelect(newForm, 'Driver', 'inputDriver1', 'col-md-3', 'taskDriver', 'Driver');

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

    for (let i = 1; i <= 10; i++) {
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



//--------------------------------------------------------------------------------------------------------




//Function to run assets' availability check


// document.getElementById('btnAddNewTask').addEventListener('click', addTaskFields);
document.getElementById('btnAddNewTask').addEventListener('click', addResourceForm);



