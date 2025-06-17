import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ITasks } from '../../models/ITasks';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private readonly apiTask = `${environment.tasksApi}/tasks`;

  constructor(private http: HttpClient) {}

  tasksApi(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(this.apiTask);
  }

  createTask(titulo: string): Observable<ITasks[]> {
    return this.http.post<ITasks[]>(this.apiTask, { titulo });
  }

  updateTask(id: number, completada: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiTask}/${id}`, { completada });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiTask}/${id}`);
  }
}
