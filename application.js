// get request for displaying all of the tasks
var displayTasks = function (filter = "") {
  $.ajax({
    type: "GET",
    url: "https://fewd-todolist-api.onrender.com/tasks?api_key=317",
    dataType: "json",

    success: function (response, textStatus) {
      // loop through each task
      $("#todo-list").empty();
      var responseTasks = response.tasks;

      //check if we need to filter active or completed tasks
      if (filter === "active") {
        responseTasks = [];
        response.tasks.forEach(function (task) {
          if (task.completed == false) {
            responseTasks.push(task);
          }
        });
      } else if (filter === "completed") {
        responseTasks = [];
        response.tasks.forEach(function (task) {
          if (task.completed == true) {
            responseTasks.push(task);
          }
        });
      }

      // loop through tasks needed to be displayed
      responseTasks.forEach(function (task) {
        console.log(task.content);
        //inject into DOM
        var htmlString =
          '<div class="task d-flex justify-content-evenly align-items-center border-bottom border-dark p-2"><span title="Delete item" class="remove mt-1" data-id="' +
          task.id +
          '"><i class="fa-solid fa-x fa-md" style="color: #e23838;"></i></span><h3 class="text-lowercase mb-0 col-3 ' +
          (task.completed ? "text-decoration-line-through" : "") +
          '" data-completed="' +
          task.completed +
          '">' +
          task.content +
          '</h3><input title="' +
          (task.completed ? "Mark active" : "Mark complete") +
          '" type="checkbox" name="complete" class="markComplete form-check form-check-input btn btn-outline-primary" data-id="' +
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

// post request to create new task
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

// delete request to delete specific task by id
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

// put request to mark a task as complete
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

// put request to mark task as active or not complete
var markTaskActive = function (id) {
  $.ajax({
    type: "PUT",
    url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "/mark_active?api_key=317",
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
  //display all tasks
  displayTasks();

  // create task when add task button clicked
  $("#addTask").on("click", function (event) {
    event.preventDefault();
    createNewTask();
  });

  // delete task when remove button clicked
  $(document).on("click", ".remove", function () {
    deleteTask($(this).data("id"));
  });

  // mark a task complete or active when checkbox checked or unchecked
  $(document).on("change", ".markComplete", function () {
    if (this.checked) {
      markTaskComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
  });

  // filter tasks based on which filter button is pressed
  $(document).on("click", "#filterButtons button", function () {
    displayTasks(this.id);
    $("#filterButtons button").removeClass("bg-warning");
    $(this).addClass("bg-warning");
  });

  // display remove buttons when user hovers over task
  $(document)
    .on("mouseenter", ".task", function () {
      $(this).addClass("bg-light");
      $(this).find("i").fadeIn(1000);
    })
    .on("mouseleave", ".task", function () {
      $(this).removeClass("bg-light");
      $(this).find("i").finish();
      $(this).find("i").fadeOut(500);
    });
});
