import { Component } from "@angular/core";
import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public todos: Array<Todo> = [];
  public click: boolean = false;
  constructor(public todoService: TodoService) {}

  async ngOnInit() {
    this.todos = await this.todoService.read();
  }

  getIcon(todo) {
    if (todo.completed) return "checkmark-circle";
    else return "stopwatch";
  }

  public async createTodo() {
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      completed: true,
      show: false,
    };
    await this.todoService.create(key, todo);
    this.todos = await this.todoService.read();
  }

  public async deleteTodo(key: any) {
    await this.todoService.delete(key);
    this.todos = await this.todoService.read();
  }

  public show(todo: Todo) {
    todo.show = true;
  }

  public async edit(todo: Todo) {
    await this.todoService.update(todo);
  }
}
