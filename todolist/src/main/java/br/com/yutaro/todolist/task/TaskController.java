package br.com.yutaro.todolist.task;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.yutaro.todolist.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/tasks")
public class TaskController {

  @Autowired
  private ITaskRepository taskRepository;

  @PostMapping("/")
  public ResponseEntity create(@RequestBody TaskModel taskmodel, HttpServletRequest request) {
    var userId = request.getAttribute("userId");
    taskmodel.setUserId((UUID) userId);

    var currentDate = LocalDateTime.now();
    if (currentDate.isAfter(taskmodel.getStartAt()) || currentDate.isAfter(taskmodel.getEndAt())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("The start/end date must beggin after the current date (" + currentDate + ").");
    }
    if (taskmodel.getStartAt().isAfter(taskmodel.getEndAt())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("The start date must beggin before the end date.");
    }

    var task = this.taskRepository.save(taskmodel);
    return ResponseEntity.status(HttpStatus.OK).body(task);
  }

  @GetMapping("/")
  public List<TaskModel> list(HttpServletRequest request) {
    var userId = request.getAttribute("userId");
    var userTasks = this.taskRepository.findByUserId((UUID) userId);
    return userTasks;
  }

  @PutMapping("/{taskId}")
  public TaskModel update(@RequestBody TaskModel taskmodel, HttpServletRequest request, @PathVariable UUID taskId) {
    var task = this.taskRepository.findById(taskId).orElse(null);

    Utils.copyNonNullProperties(taskmodel, task);

    return this.taskRepository.save(task);
  }
}
