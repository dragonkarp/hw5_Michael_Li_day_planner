//TEST AREA///////////////////////////
todaysDate();
//generateRow(10, "PM");
generateHoursList();
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
    row.attr("id", hour+meridiem); // How to target the row
    var inputDivEl = $("<div>").addClass("input-group-prepend");
    var timeSpanEl = $("<span>").addClass("input-group-text");
    timeSpanEl.attr("id", "inputGroup-sizing-default");
    timeSpanEl.text(hour+meridiem);
    var taskButton = $("<button>").addClass("btn btn-info");
    taskButton.attr("type", "button");
    taskButton.text("Add Event");
    var inputBox = $("<input>").addClass("form-control");
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

// 
function generateHoursList() {
    var workHours = [9,10,11,12,1,2,3,4,5];
    for (var i = 0; i < workHours.length; i++) {
        var meridiem = "";
        if (i < 4) {
            meridiem = "AM";
        } else if (i >= 4) {
            meridiem = "PM";
        }
        generateRow(workHours[i], meridiem);
    }
}