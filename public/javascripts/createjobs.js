//Functions Area
let accumulator = "";

function addTaskFields() {
    alert("Working");
    accumulator = document.getElementById('tasksContainer').innerHTML;
    accumulator = accumulator + `<h4 style="color: black; font-weight: bold;">Task 1</h4>
            <form class="row g-3 needs-validation" novalidate>
                <div class="col-md-3">
                    <label for="inputStart" class="form-label">Start Date</label>
                    <input type="date" class="form-control" class="taskDates">
                </div>
                <div class="col-md-3">
                    <label for="inputEndDate" class="form-label">End Date</label>
                    <input type="date" class="form-control" class="taskDates">
                </div>
                <div class="col-md-6">
                    <label hidden>Filler</label>
                </div>
                <!--Start and end time - Yard and Site-->
                <div class="col-md-3">
                    <label for="inputStartYard" class="form-label">Yard Start</label>
                    <select class="form-select" class="taskTimes">
                        <option selected>Choose...</option>
                        {% for i in range(0, 24) %}
                            {% if i < 12 %}
                                <option>{{i}}:00am</option>
                                <option>{{i}}:30am</option>
                            {% else %}
                                <option>{{i % 24}}:00pm</option>
                                <option>{{i % 24}}:30pm</option>
                            {% endif %}
                        {% endfor %}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputStartSite" class="form-label">Site Start</label>
                    <select class="form-select" class="taskTimes">
                        <option selected>Choose...</option>
                        {% for i in range(0, 24) %}
                            {% if i < 12 %}
                                <option>{{i}}:00am</option>
                                <option>{{i}}:30am</option>
                            {% else %}
                                <option>{{i % 24}}:00pm</option>
                                <option>{{i % 24}}:30pm</option>
                            {% endif %}
                        {% endfor %}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputFinishSite" class="form-label">Site Finish</label>
                    <select class="form-select" class="taskTimes">
                        <option selected>Choose...</option>
                        {% for i in range(0, 24) %}
                            {% if i < 12 %}
                                <option>{{i}}:00am</option>
                                <option>{{i}}:30am</option>
                            {% else %}
                                <option>{{i % 24}}:00pm</option>
                                <option>{{i % 24}}:30pm</option>
                            {% endif %}
                        {% endfor %}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputFinishYard" class="form-label">Yard Finish</label>
                    <select class="form-select" class="taskTimes">
                        <option selected>Choose...</option>
                        {% for i in range(0, 24) %}
                            {% if i < 12 %}
                                <option>{{i}}:00am</option>
                                <option>{{i}}:30am</option>
                            {% else %}
                                <option>{{i % 24}}:00pm</option>
                                <option>{{i % 24}}:30pm</option>
                            {% endif %}
                        {% endfor %}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputAsset1" class="form-label">Asset</label>
                    <select class="form-select" class="taskAsset">
                        <option>Asset</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputDriver1" class="form-label">Driver</label>
                    <select class="form-select" class="taskDriver">
                        <option>Driver</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputRigger1" class="form-label">Rigger - 1</label>
                    <select class="form-select" class="taskRiggers">
                        <option>Rigger - 1</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputRigger2" class="form-label">Rigger - 2</label>
                    <select class="form-select" class="taskRiggers">
                        <option>Rigger - 2</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="mb-3" style="margin-bottom: 0px; margin-top: 20px;">
                    <label for="liftingEquipmentManCages1" class="form-label">Lifting Equipment and man cages</label>
                    <textarea class="form-control" class="liftingEquipment" rows="3" placeholder="Please describe lifting equipment and man cages required for this task."></textarea>
                </div>
                <div class="mb-3" style="margin-bottom: 0px; margin-top: 0px;">
                    <label for="counterweightBogMats1" class="form-label">Counterweight and bog mats</label>
                    <textarea class="form-control" class="cwt" rows="3" placeholder="Please describe counterweight and bog mats required for this task."></textarea>
                </div>
                <div class="mb-3" style="margin-bottom: 0px; margin-top: 0px;">
                    <label for="inductionsClearances1" class="form-label">Inductions and clearances</label>
                    <textarea class="form-control" class="inductions" rows="3" placeholder="Please describe inductions and clearances required for this task."></textarea>
                </div>
                <hr>
                <h4 style="color: black; font-weight: bold;">Extra riggers</h4>
                <div class="col-md-3">
                    <label for="inputRigger1" class="form-label">Rigger - 1</label>
                    <select class="form-select" id="selectRigger1" class="taskRiggers">
                        <option>Rigger - 1</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputRigger2" class="form-label">Rigger - 2</label>
                    <select class="form-select" id="selectRigger2" class="taskRiggers">
                        <option>Rigger - 2</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputRigger1" class="form-label">Rigger - 3</label>
                    <select class="form-select" id="selectRigger1" class="taskRiggers">
                        <option>Rigger - 3</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputRigger2" class="form-label">Rigger - 4</label>
                    <select class="form-select" id="selectRigger2" class="taskRiggers">
                        <option>Rigger - 4</option>
                        {# {% for opt in toParse %}
                            <option value="{{opt.assetType}}">{{opt.assetType}}</option>
                        {% endfor %} #}
                    </select>
                </div>
            </form>`
    document.getElementById('tasksContainer').innerHTML = accumulator;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



//--------------------------------------------------------------------------------------------------------




//Function to run assets' availability check


document.getElementById('btnAddNewTask').addEventListener('click', addTaskFields);



