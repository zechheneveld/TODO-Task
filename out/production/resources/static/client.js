$(document).ready(function () {
    console.log("Is this working???");
    init();
});

function init() {
    enable();
    getTask();
}
function enable() {
    $("#btnSubmit").on("click", submitTask);
    $("#container").on("click", ".deleteBtn", deleteTask);
    $("#container").on("click", ".doneBtn", putDoneLight);

}
function submitTask(event) {
    event.preventDefault();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/tasks",
        data: JSON.stringify({
            // id: $("#empId").val(),
            todo: $("#empTodo").val(),
            done: false
        }),
        success: function(data){
            getTask();
        }
    });

    // $("#empId").val("");
    $("#empTodo").val("");

}

function getTask() {
    $.ajax({
        type: "GET",
        url: "/tasks",
        success: function(data){
            var tasks = data._embedded.tasks;
            console.log(tasks);
            appendTask(tasks);
        }
    });
}


function deleteTask() {

    var id = $(this).data("id");

    $.ajax({
        type: "DELETE",
        url: "/tasks/" + id,
        success: function(data){
            getTask();
        }
    });

}

function putDoneLight() {
    var id = $(this).data("id");
    var status = $(this).data("done");

    $.ajax({
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/tasks/" + id,
        data: JSON.stringify({
            done: !status
        }),
        success: function(data){
            getTask();
        }
    });
}
function appendTask(taskArray) {
    $("#container").empty();
    if (taskArray.length == 0) {
        $("#container").append("<div></div>");
        var el = $("#container").children().last();
        el.append("<span>No tasks found!</span>");
    }

    for (var i = 0; i < taskArray.length; i++) {
        var task = taskArray[i];

        $("#container").append("<div></div>");
        var el = $("#container").children().last();

        if (task.done){
            el.addClass("doneLight");
        }

        el.append(
            "<span>" + task.todo + " - </span>" +
            "<button class='deleteBtn btn btn-danger'>X</button>"
        );
        el.children().last().data('id', task.id);

        el.append("<button class='doneBtn btn btn-warning'>Complete</button>");
        el.children().last().data('done', task.done);
        el.children().last().data('id', task.id);

    }
}
