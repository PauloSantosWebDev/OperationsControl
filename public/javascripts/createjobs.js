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
    let formNumber = 2;
    const formContainer = document.getElementById('resourceContainer');

    const newForm = document.createElement('form');
    newForm.className = 'row g-3 needs-validation';
    const subtitle = document.createElement('h4');
    subtitle.style = 'color: black; font-weight: bold;';
    subtitle.innerHTML = `Resource - ${formNumber}`;
    newForm.appendChild(subtitle);
    const divStartDate = document.createElement('div');
    divStartDate.className = 'col-md-3';
    const labelStartDate = document.createElement('label');
    labelStartDate.className = 'form-label';
    labelStartDate.innerHTML = 'Start Date';
    const inputStartDate = document.createElement('input');
    inputStartDate.type = 'date';
    inputStartDate.className = 'form-control';

    divStartDate.appendChild(labelStartDate);
    divStartDate.appendChild(inputStartDate);
    newForm.appendChild(divStartDate);

    const divEndDate = document.createElement('div');
    divEndDate.className = 'col-md-3';
    const labelEndDate = document.createElement('label');
    labelEndDate.className = 'form-label';
    labelEndDate.innerHTML = 'End Date';
    const inputEndDate = document.createElement('input');
    inputEndDate.type = 'date';
    inputEndDate.className = 'form-control';

    divEndDate.appendChild(labelEndDate);
    divEndDate.appendChild(inputEndDate);
    newForm.appendChild(divEndDate);

    const divDatesFiller = document.createElement('div');
    divDatesFiller.className = 'col-md-6';
    const labelDatesFiller = document.createElement('div');
    labelDatesFiller.innerHTML = 'Filler';
    labelDatesFiller.hidden = true;

    divDatesFiller.appendChild(labelDatesFiller);
    newForm.appendChild(divDatesFiller);

    const divYardStart = document.createElement('div');
    divYardStart.className = 'col-md-3';
    const labelYardStart = document.createElement('label');
    labelYardStart.className = 'form-label';
    labelYardStart.innerHTML = 'End Date';
    const selectYardStart = document.createElement('select');
    selectYardStart.className = 'form-select taskTimes';
    const optionYardStart = document.createElement('option');
    optionYardStart.value = 'test';
    optionYardStart.textContent = 'test';
    
    selectYardStart.appendChild(optionYardStart);
    divYardStart.appendChild(labelYardStart);
    divYardStart.appendChild(selectYardStart);

    formContainer.appendChild(newForm);
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



//--------------------------------------------------------------------------------------------------------




//Function to run assets' availability check


// document.getElementById('btnAddNewTask').addEventListener('click', addTaskFields);
document.getElementById('btnAddNewTask').addEventListener('click', addResourceForm);



