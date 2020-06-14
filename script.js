//RUN PROGRAM///////////////////////////
todaysDate();
generateHoursList();
loadData();
//RUN PROGRAM///////////////////////////

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
// Using bootstrap classes.
function generateRow(hour, meridiem, color, i) {
    var mainContainer = $(".mainContainer");
    var inputDivEl = $("<div>").addClass("row");
    var timeSpanEl = $("<span>").addClass("input-group-text");
    timeSpanEl.attr("id", "inputGroup-sizing-default");
    timeSpanEl.addClass("timeSpanElSizing col-sm-1");
    timeSpanEl.text(hour+meridiem);
    var taskButton = $("<button>").addClass("btn btn-info col-sm-1 save-button");
    taskButton.addClass("user-text-input-button ");
    taskButton.attr("type", "button");
    taskButton.text("Add Event");
    taskButton.attr("data-id", i)
    taskButton.attr("id", hour+meridiem+"-button"); // Used for onclick listener.
    var inputBox = $("<textarea>").addClass("form-control col-sm-10 " + color);
    inputBox.addClass("user-text-input-field text-white");
    inputBox.attr("id", i); // Used to select element and apply color based on time. Refer to colorOfBackground() definition. 
    inputBox.attr("aria-label", "Sizing example input");
    inputBox.attr("aria-describedby", "inputGroup-sizing-default");

    inputDivEl.append(timeSpanEl);
    inputDivEl.append(inputBox);
    inputDivEl.append(taskButton);
     
    mainContainer.append(inputDivEl);
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
    var getCurrentHour = moment().hour();
    var workHours = [9,10,11,12,1,2,3,4,5];
    var militaryHours = [9,10,11,12,13,14,15,16,17];
    for (var i = 0; i < workHours.length; i++) {
        var meridiem = "";
        if (i < 3) {
            meridiem = "AM";
        } else if (i >= 3) {
            meridiem = "PM";
        }
        if (getCurrentHour === militaryHours[i]) {
            generateRow(workHours[i], meridiem, "bg-danger", i);
        }
        else if (getCurrentHour > militaryHours[i]) {
            generateRow(workHours[i], meridiem, "bg-secondary", i);
        }
        else if (getCurrentHour < militaryHours[i]) {
            generateRow(workHours[i], meridiem, "bg-success", i);
        }

        
    }
}

// Captures data in field.
// On "Add Event" button click.
$(document).on("click",".save-button", function(event) {
    event.preventDefault();
    alert("HELLO WORLD");
    
    var dataID = $(this).attr("data-id");

    var getTask = $("#"+dataID).val();
    localStorage.setItem(dataID, getTask);
    
});


// Gets data from local storage.
function loadData() {
    for (var i = 0; i < 9; i++) {
        var getTaskFromLocalStorage = localStorage.getItem(i);
        if (getTaskFromLocalStorage) {
              $("#"+i).val(getTaskFromLocalStorage); 
        }
    }
}

//////////QUESTIONS FOR PHIL////////////////
// 1) ask phil about token failed to consume. 
// 2) Don't know why the keypress listener will take the value stored in a var inside something else's local scope. 
// 3) I don't know what strategy to use to record user input, store it, and output it upon refresh. 
// 4) Can you compare keys to some other value? ie. var x = {1:one}, does key = 1 evaluate to true?
        // ended up using an array. I don't fundamentally understand objects, i guess. Not good for iterating with? 
        //I seems like Objects are useful if you already know the key, but not if you are trying to find the key. Is this correct?
// 5) Why is the "float-right" class not working on the button?
//////////QUESTIONS FOR PHIL////////////////


//FAILED FUNCTIONS//////////////////
// Colors input box background based on past, present, and future. 
// function colorOfBackground() {
//     var currentHour = parseInt(moment().format("H"));
//     var currentHoursWeight;
//     var hoursAndTheirWeights = [[9,1],[10,2],[11,3],[12,4],[1,5],[2,6],[3,7],[4,8],[5,9]];
//     var invalidMorningHours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM"];
//     var invalidEveningHours = ["6PM", "7PM", "8PM","9PM", "10PM", "11PM"];
//     var currentHourAndMeridiem = moment().format("hA");

//     // Gets weight of the current hour
//     // loop through array again
//     //      if currentHoursWeight > than value we are looking at, color background grey
//     //      if currentHoursWeight == than value we are looking at, color background red
//     //      if currentHoursWeight < than value we are looking at, color background green
//     //      (the input field has an id="9-5", ie, id="9", refer to line 53 in this file)
//     for (var i = 0; i < hoursAndTheirWeights.length; i++) {
//         if (hoursAndTheirWeights[i][0] === currentHour) {
//             currentHoursWeight = hoursAndTheirWeights[i][1];
//         }
//     }

//     for (var i = 0; i < hoursAndTheirWeights.length; i++) {
//         if ((hoursAndTheirWeights[i][1] < currentHoursWeight)) {
//             $("#"+hoursAndTheirWeights[i]).css("background-color", "grey");
//         }
//         if (hoursAndTheirWeights[i][1] == currentHoursWeight) {
//             $("#"+hoursAndTheirWeights[i]).css("background-color", "red");
//         }
//         if (hoursAndTheirWeights[i][1] > currentHoursWeight) {
//             $("#"+hoursAndTheirWeights[i]).css("background-color", "green");
//         }
//     }

//     // if current hour is in 12am-8am array, color all green
//     // if current hour is in 6am-11am array, color all grey
//     if (invalidMorningHours.includes(currentHourAndMeridiem)) {
//         for (var i = 0; i < hoursAndTheirWeights.length; i++) {
//             $("#"+(hoursAndTheirWeights[i])).css("background-color", "green");
//         }
//     }
//     if (invalidEveningHours.includes(currentHourAndMeridiem)) {
//         for (var i = 0; i < hoursAndTheirWeights.length; i++) {
//             $("#"+(hoursAndTheirWeights[i])).css("background-color", "grey");
//         }
//     }
// }
//FAILED FUNCTIONS//////////////////