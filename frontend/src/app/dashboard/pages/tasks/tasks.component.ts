import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITasks } from 'src/app/core/models/ITasks';
import { TareasService } from 'src/app/core/services/tareas/tareas.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TasksComponent {
  private taskService = inject(TareasService);

  dataTasks: ITasks[] = [];
  newTaskTitle = '';

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.tasksApi().subscribe({
      next: (data) => {
        this.dataTasks = data;
      },
      error: (error) => {
        console.error('error al obtener datos de tareas', error);
      },
    });
  }

  createTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.createTask(this.newTaskTitle).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.getTasks();
      },
      error: (error) => {
        console.error('error al crear la tarea', error);
      },
    });
  }

  toggleComplete(task: ITasks): void {
    const nuevoEstado = !task.completada;

    this.taskService.updateTask(task.id, nuevoEstado).subscribe({
      next: (actualizada) => {
        task.completada = actualizada.completada;
      },
      error: (err) => console.error('no se alterno la tarea', err),
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (error) => {
        console.error('error al eliminar la tarea', error);
      },
    });
  }
}
