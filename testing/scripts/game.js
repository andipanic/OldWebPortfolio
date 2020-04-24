//Been to variables
beentocorridor = true;

// item vars
sword = false;

// current room
currentroom = "n_corridor";

$(document).ready(function() {
    $("#console").fadeIn(1500);

    $("form").submit(function() {
        var input = $("#command_line").val();
        console.log(input);  
        if (input == "help") {
            $("#message_help").clone().insertBefore("#placeholder").fadeIn(1000);
        }
        $("#command_line").val("");
    });
});
