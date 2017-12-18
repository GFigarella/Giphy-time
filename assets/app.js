$(document).ready(function () {

    // Do buttons for the gifs to search
    // These will be dynamically created using jQuery
    // For buttons, will need: 
    // a form where the user can type his/her input, and a button to add that word to the buttons.
    // an array to which we can push the new buttons being added.
    // an on click function that will take the user input and convert it to a button.
    // a loop that will go through the array, clear it and re-add the buttons, including the new one with the user input.

    var topics = [];

    // function that will sort through the array topics, and add the new buttons
    function addButton() {
        // This will clear out the topics array everytime the function is called, to avoid having repeated buttons
        $("#topics").empty()

        // loop that will add the button
        for (i = 0; i < topics.length; i++) {
            var newButton = $("<button>")
            newButton.addClass("btn btn-success buttons")
            newButton.text(topics[i]);
            newButton.attr("data-name", topics[i]);
            $("#topics").append(newButton);
        }
    }

    function clearText() {
        $("#topic-type").val("");
    }

    // click function to add the buttons to our array
    $("#add-topic").on('click', function (event) {
        //.preventDefault() will prevent the submit button form sending a form
        event.preventDefault();

        // assigning the value of the text submitted by the user to a variable
        var newTopic = $("#topic-type").val().trim();

        //push the new variable newTopic to our topics array.
        topics.push(newTopic);

        // call the function addButton so that the loop runs
        addButton();
        $("#topic-type").val("");
    });

    // AJAX call
    // for the call we need an API key and the parameters so that the URL works correctly
    // set the promise, and after the promise, perform a function
    // that function will look for gifs based on the buttons created from the user input
    // then the function will prepend the giff to the corresponding gif.
    // using prepend so that the last-searched gif is always on top of the page.

    // set up the queryURL
    // all of the ajax call will go inside an onclick function, so that it all happens when the user clicks a button at the top of the screen.

    $(document).on("click", ".buttons", function () {
        $("#gifs").empty();
        console.log("You clicked " + $(this).attr("data-name"));
        var q = $(this).attr("data-name");
        console.log("q is " + q);
        var api_key = "zaFO7iKkJOeIh5ISoyLyhCMFNi10fTLA";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + api_key + "&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            console.log(response.data.length);
            // for loop to iterate through response and print the gifs to the screen
            // we want to grab rating and url from the response object
            // then we want to append the info to the screen
            // p tag for rating, then append the url
            for (i=0; i<response.data.length; i++){
                //grab the rating
                var p = $("<p>")
                p.html(response.data[i].rating);
                $("#gifs").append(p);
                // dynamically creating the images
                // setting attributes for data-still and data-animate to be able to change them later on
                var img = $("<img>");
                img.attr('src', response.data[i].images.fixed_height_still.url);
                img.attr('data-still', response.data[i].images.fixed_height_still.url);
                img.attr('data-animate', response.data[i].images.fixed_height.url);
                // data state helps track which url we're using
                img.attr('data-state', "still");
                $("#gifs").append(img);
            } 
        });
    });
    // onlick to pause/animate the gifs
                $(document).on('click', "img", function(){
                    // if state is still, change the img src to the animated gif URL
                    if ($(this).attr('data-state') == 'still'){
                        $(this).attr('src', $(this).attr('data-animate'));
                        $(this).attr('data-state', "animated");
                    }
                    // otherwise, change the img src to the still URL
                    else{
                        $(this).attr('src', $(this).attr('data-still'));
                        $(this).attr('data-state', 'still');
                    }
                })

    

    


























});