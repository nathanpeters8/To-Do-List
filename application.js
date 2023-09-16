var displayTasks = function () {
  // get request for list of tasks
  $.ajax({
    type: "GET",
    url: "https://fewd-todolist-api.onrender.com/tasks?api_key=317",
    dataType: "json",

    success: function (response, textStatus) {
      // loop through each task
      $("#todo-list").empty();
      response.tasks.forEach(function (task) {
        console.log(task.content);
        //inject into DOM
        var htmlString =
          '<div class="task d-flex justify-content-evenly align-items-center border-bottom p-2"><span class="remove mt-1" data-id="' +
          task.id +
          '"><i class="fa-solid fa-x fa-md" style="color: #e23838;"></i></span><h3 class="text-lowercase mb-0 col-3 ' +
          (task.completed ? "text-decoration-line-through" : "") +
          '">' +
          task.content +
          '</h3><input type="checkbox" name="complete" class="markComplete form-check form-check-input btn btn-outline-primary" data-id="' +
          task.id +
          '" ' +
          (task.completed ? "checked" : "") +
          "></div>";

        $("#todo-list").append(htmlString);
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

// create new task
var createNewTask = function () {
  $.ajax({
    type: "POST",
    url: "https://fewd-todolist-api.onrender.com/tasks?api_key=317",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#taskInput").val(),
      },
    }),
    success: function (response, textStatus) {
      console.log(response);
      $("#taskInput").val("");
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

var deleteTask = function (id) {
  $.ajax({
    type: "DELETE",
    url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "?api_key=317",
    success: function (response, textStatus) {
      console.log(response);
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

// mark a task as complete
var markTaskComplete = function (id) {
  $.ajax({
    type: "PUT",
    url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "/mark_complete?api_key=317",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

// check if dom is ready
$(document).ready(function () {
  displayTasks();
  // create task when add task button clicked
  $("#addTask").on("click", function (event) {
    event.preventDefault();
    createNewTask();
  });

  // delete task when remove button clicked
  $(document).on("click", ".remove", function () {
    console.log($(this).data("id"));
    deleteTask($(this).data("id"));
  });

  // mark a task complete when checkbox checked
  $(document).on("change", ".markComplete", function () {
    console.log(this.checked);
    if (this.checked) {
      markTaskComplete($(this).data("id"));
    }
  });
});
