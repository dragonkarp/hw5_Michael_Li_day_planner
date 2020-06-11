function boombaby () {
    $("#currentDay").append($("<h1>").text("hello"));}

console.log(moment().format("dddd, MMMM Do"));


//TEST AREA///////////////////////////
todaysDate();
//TEST AREA///////////////////////////







function todaysDate() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

