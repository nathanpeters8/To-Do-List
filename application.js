var displayTasks = function() {
    // get request for list of tasks
    $.ajax({
        type: 'GET',
        url: "https://fewd-todolist-api.onrender.com/tasks?api_key=1",
        dataType: "json",
        
        success: function(response, textStatus) {
            // loop through each task
            response.tasks.forEach(function(task) {
                console.log(task.content);

                //inject into DOM
                var htmlString = '<div class="task d-flex justify-content-evenly align-items-center border-bottom p-2"><span class="remove mt-1"><i class="fa-solid fa-x fa-md" style="color: #e23838;"></i></span><h3 class="text-lowercase mb-0 col-3">' + task.content + '</h3><input type="checkbox" name="complete" id="markComplete" class="form-check form-check-input btn btn-outline-primary"></div>';

                $("#todo-list").append(htmlString);
            });
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

// check if dom is ready
$(document).ready(function() {
    displayTasks();
});