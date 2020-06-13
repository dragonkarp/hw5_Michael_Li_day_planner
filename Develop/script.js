//TEST AREA///////////////////////////
todaysDate();
generateHoursList();
colorOfBackground();
//generateRow(10, "PM");
//TEST AREA///////////////////////////

// Generates a new HTML <div>.
// The div is populated with other HTML tags.
// The result is a row with the:
//      hour (9AM-5PM) to the left.
//      add task button in the center.
//      text input field to the right.
// The hour and meridiem parameter is used to create an id whose string is the hour(numeric):
//      This provides a way to:
//          target the element.
//          set the appropriate time and meridiem in the <span> text.
// Using bootstrap
function generateRow(hour, meridiem) {
    var mainContainer = $(".mainContainer");
    var row = $("<div>").addClass("input-group mb-3");
    var inputDivEl = $("<div>").addClass("input-group-prepend");
    var timeSpanEl = $("<span>").addClass("input-group-text");
    timeSpanEl.attr("id", "inputGroup-sizing-default");
    timeSpanEl.addClass("timeSpanElSizing");
    timeSpanEl.text(hour+meridiem);
    var taskButton = $("<button>").addClass("btn btn-info");
    taskButton.addClass("user-text-input-button");
    taskButton.attr("type", "button");
    taskButton.text("Add Event");
    taskButton.attr("id", hour+meridiem+"-button"); // Used for onclick listener.
    var inputBox = $("<input>").addClass("form-control");
    inputBox.addClass("user-text-input-field"); // Used for "enter" key listener.
    inputBox.attr("id", hour); // Used to select element and apply color based on time. Refer to colorOfBackground() definition. 
    inputBox.attr("type", "text");
    inputBox.attr("aria-label", "Sizing example input");
    inputBox.attr("aria-describedby", "inputGroup-sizing-default");

    mainContainer.append(row);
    row.append(inputDivEl);
    inputDivEl.append(timeSpanEl);
    inputDivEl.append(taskButton);
    row.append(inputBox);
}

// Uses moment.js to get current day, month, and date.
// Sets text of hardcoded <p id="#currentDay">.
function todaysDate() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

// Loops though array of typical work hours (9am-5pm).
// Calls generateRow(hour, meridiem) on each loop.
// Passes the time and meridiem.
// The meridiem is determined by logic performed on the ith element(hour of day).
function generateHoursList() {
    var workHours = [9,10,11,12,1,2,3,4,5];
    for (var i = 0; i < workHours.length; i++) {
        var meridiem = "";
        if (i < 3) {
            meridiem = "AM";
        } else if (i >= 3) {
            meridiem = "PM";
        }
        generateRow(workHours[i], meridiem);
    }
}

// Colors input box background based on past, present, and future. 
function colorOfBackground() {
    var currentHour = parseInt(moment().format("H"));
    var currentHoursWeight;
    var hoursAndTheirWeights = [[9,1],[10,2],[11,3],[12,4],[1,5],[2,6],[3,7],[4,8],[5,9]];
    var invalidMorningHours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM"];
    var invalidEveningHours = ["6PM", "7PM", "8PM","9PM", "10PM", "11PM"];
    var currentHourAndMeridiem = moment().format("hA");

// Gets weight of the current hour
// loop through array again
//      if currentHoursWeight > than value we are looking at, color background grey
//      if currentHoursWeight == than value we are looking at, color background red
//      if currentHoursWeight < than value we are looking at, color background green
//      (the input field has an id="9-5", ie, id="9", refer to line 53 in this file)
    for (var i = 0; i < hoursAndTheirWeights.length; i++) {
        if (hoursAndTheirWeights[i][0] === currentHour) {
            currentHoursWeight = hoursAndTheirWeights[i][1];
        }
    }

    for (var i = 0; i < hoursAndTheirWeights.length; i++) {
        if ((hoursAndTheirWeights[i][1] < currentHoursWeight)) {
            $("#"+hoursAndTheirWeights[i]).css("background-color", "grey");
        }
        if (hoursAndTheirWeights[i][1] == currentHoursWeight) {
            $("#"+hoursAndTheirWeights[i]).css("background-color", "red");
        }
        if (hoursAndTheirWeights[i][1] > currentHoursWeight) {
            $("#"+hoursAndTheirWeights[i]).css("background-color", "green");
        }
    }

// if current hour is in 12am-8am array, color all green
// if current hour is in 6am-11am array, color all grey
    if (invalidMorningHours.includes(currentHourAndMeridiem)) {
        for (var i = 0; i < hoursAndTheirWeights.length; i++) {
            $("#"+(hoursAndTheirWeights[i])).css("background-color", "green");
        }
    }
    if (invalidEveningHours.includes(currentHourAndMeridiem)) {
        for (var i = 0; i < hoursAndTheirWeights.length; i++) {
            $("#"+(hoursAndTheirWeights[i])).css("background-color", "grey");
        }
    }
}


// Captures data in field.
// On "Add Event" button click.
// $(".user-text-input-button").on("click", function(event) {
//     event.preventDefault();
//     var task_buttonClick = $(".user-text-input-field").val();
//     var myObj = {task: task_buttonClick}

//     //how do I get this to populate the specific input box on refresh?

//     var myObj_serialized = JSON.stringify(myObj);
//     console.log(myObj_serialized);

//     localStorage.setItem("task", myObj_serialized);
//     localStorage.getItem("the_task");

//     var myObj_deserialized = JSON.parse(localStorage.setItem("task", myObj_serialized));
//     console.log(myObj_deserialized);
// });

// Captures data in field.
// On "return" press.
// $(".user-text-input-field").on('keypress',function(e) {
//     if(e.which == 13) {
//         var task_inputField = $(".user-text-input-field").val();
//         console.log(task_inputField);
//     }
// });









//////////QUESTIONS FOR PHIL////////////////
// 1) ask phil about token failed to consume. 
// 2) Don't know why the keypress listener will take the value stored in a var inside something else's local scope. 
// 3) I don't know what strategy to use to record user input, store it, and output it upon refresh. 
// 4) Can you compare keys to some other value? ie. var x = {1:one}, does key = 1 evaluate to true?
        // ended up using an array. I don't fundamentally understand objects, i guess. Not good for iterating with? 
        //I seems like Objects are useful if you already know the key, but not if you are trying to find the key. Is this correct?
// 5) Why is the "float-right" class not working on the button?
//////////QUESTIONS FOR PHIL////////////////