//TEST AREA///////////////////////////
todaysDate();
//generateRow(10, "PM");
generateHoursList();
// pastPresentFutureColor(9);
// pastPresentFutureColor(10);
// pastPresentFutureColor(11);
// pastPresentFutureColor(12);
// pastPresentFutureColor(1);
// pastPresentFutureColor(2);
// pastPresentFutureColor(3);
// pastPresentFutureColor(4);
// pastPresentFutureColor(5);
// colorOfBackground(9);
// colorOfBackground(10);
// colorOfBackground(11);
// colorOfBackground(12);
// colorOfBackground(1);
// colorOfBackground(2);
// colorOfBackground(3);
// colorOfBackground(4);
// colorOfBackground(5);
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
    taskButton.attr("id", hour+meridiem+"-button");
    var inputBox = $("<input>").addClass("form-control");
    inputBox.addClass("user-text-input-field");
    inputBox.attr("id", hour+meridiem);
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
        if (i < 4) {
            meridiem = "AM";
        } else if (i >= 4) {
            meridiem = "PM";
        }
        generateRow(workHours[i], meridiem);
    }
}

// Captures data in field.
// On "Add Event" button click.
$(".user-text-input-button").on("click", function(event) {
    event.preventDefault();
    var task_buttonClick = $(".user-text-input-field").val();
    var myObj = {task: task_buttonClick}

    //how do I get this to populate the specific input box on refresh?

    var myObj_serialized = JSON.stringify(myObj);
    console.log(myObj_serialized);

    localStorage.setItem("task", myObj_serialized);
    localStorage.getItem("the_task");

    var myObj_deserialized = JSON.parse(localStorage.setItem("task", myObj_serialized));
    console.log(myObj_deserialized);
});

// Captures data in field.
// On "return" press.
// $(".user-text-input-field").on('keypress',function(e) {
//     if(e.which == 13) {
//         var task_inputField = $(".user-text-input-field").val();
//         console.log(task_inputField);
//     }
// });



// function pastPresentFutureColor(hour) { 
//     var time = hour + "";
//     time.trim();
//     var currentMeridiem = moment().format("A");
//     var current_HourInt = parseInt(moment().format("h"));
//     var arr = [1,2,3,4,5];

//     // console.log(time);
//     // console.log(typeof time);
//     // console.log(moment().format("h"));
//     // console.log(typeof moment().format("h"));

//     // console.log("boom");
//     // console.log(parseInt(time));
//     // console.log(typeof parseInt(time));
//     // console.log(typeof parseInt(moment().format("h")));

//     if (time === moment().format("h")) {
//         $(("#"+time+currentMeridiem)).css("background-color", "red");
//     }
    
//     if ((arr.includes(hour)) && (arr.includes(current_HourInt)) && (hour > current_HourInt)) {
//         $(("#"+time+currentMeridiem)).css("background-color", "green");
//         console.log("AAAAA");
//     } else if ((hour < current_HourInt)) {
//         $(("#"+time+currentMeridiem)).css("background-color", "grey");
//     } else if (hour > current_HourInt) {
//         $(("#"+time+currentMeridiem)).css("background-color", "green");
//     }
// }

// function colorOfBackground(hour) {
//     var amTimes = [9,10,11,12];
//     var pmTimes = [1,2,3,4,5];
//     var currentMeridiem = moment().format("A"); //string
//     var currentHour = moment().format("h"); //string
//     var current_hourInt = parseInt(moment().format("h")); //int 
//     console.log(moment("13:00", 'HH:mm').format('hh:mm a'));
//     console.log("BOOM");
//     console.log(hour);
//     if (amTimes.includes(hour)) {
//         console.log("test 1");
//         if (hour < current_hourInt) {
//             $(("#"+hour+currentMeridiem)).css("background-color", "grey");
//             console.log("test 2");
//         } else if (hour === current_hourInt) {
//             $(("#"+hour+currentMeridiem)).css("background-color", "red");
//             console.log("test 3");
//         } else if (hour > current_hourInt) {
//             $(("#"+hour+currentMeridiem)).css("background-color", "green");
//             console.log("test 3");
//         }
//     }
//     console.log("BABY");

// }

// function colorOfBackground(hour) {
//     var arrHoursMeridiem = [9,10,11,12,1,2,3,4,5];
//     var arrHoursMilitary = [9,10,11,12,13,14,15,16,17];
//     var currentMeridiem = moment().format("A"); //string
//     var currentHour = moment().format("h"); //string
//     var current_meridiemHour = parseInt(moment().format("h")); //int 
//     var current_militaryHour = parseInt(moment().format("H"));
//     console.log(current_militaryHour);

//     if (hour  === current_meridiemHour) {
//         $(("#"+hour+currentMeridiem)).css("background-color", "red");
//     } else {
//         for (var i = 0; i < arrHoursMeridiem.length; i++) {
//             if (current_meridiemHour === arrHoursMeridiem[i]) {
//                 for (var j = i; j < arrHoursMilitary.length; i++) {
//                     $(("#"+hour+currentMeridiem)).css("background-color", "grey");
//                 }
//             } else if (current_meridiemHour === arrHoursMeridiem[i]) {
//                 for (var j = 0; j < arrHoursMilitary[i]; i++) {
//                     $(("#"+hour+currentMeridiem)).css("background-color", "green");
//                 }
//             }
//         } 
//     }
// }



/* 
1) ask phil about token failed to consume. 
2) Don't know why the keypress listener will take the value stored in a var inside something else's local scope. 
3) Can;t get background color code to work. Logic help.
4) I don't know what strategy to use to record user input, store it, and output it upon refresh. 
*/