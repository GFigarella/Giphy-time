$(document).ready(function() {

    // Do buttons for the gifs to search
    // These will be dynamically created using jQuery
    // For buttons, will need: 
    // a form where the user can type his/her input, and a button to add that word to the buttons.
    // an array to which we can push the new buttons being added.
    // an on click function that will take the user input and convert it to a button.
    // a loop that will go through the array, clear it and re-add the buttons, including the new one with the user input.

    var topics = [];
    
    // function that will sort through the array topics, and add the new buttons
    function addButton(){
        // This will clear out the topics array everytime the function is called, to avoid having repeated buttons
        $("#topics").empty()

        // loop that will add the button
        for (i=0; i<topics.length; i++){
            var newButton = $("<button>")
            newButton.addClass("btn btn-success buttons")
            newButton.text(topics[i]);
            $("#topics").append(newButton);
        }
    }

    function clearText(){
        console.log("val is " + $("#topic-type").val());
        $("#topic-type").val("");
    }

    // click function to add the buttons to our array
    $("#add-topic").on('click', function(event){
        //.preventDefault() will prevent the submit button form sending a form
        event.preventDefault();

        console.log("clicked: " + this.value);

        // assigning the value of the text submitted by the user to a variable
        var newTopic = $("#topic-type").val().trim();
        console.log(newTopic);

        //push the new variable newTopic to our topics array.
        topics.push(newTopic);

        // call the function addButton so that the loop runs
        addButton();
        $("#topic-type").val("");
    });
    


    



















});