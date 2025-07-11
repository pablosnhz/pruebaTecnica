import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  map,
} from 'rxjs';
import { IUsers } from 'src/app/core/models/IUsers';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private authService = inject(AuthService);

  $user: Signal<boolean> = this.authService.$user;

  searchControl = new FormControl('');
  data: any;

  ngOnInit(): void {
    this.getUsers();
    this.searchUser();
  }

  getUsers() {
    this.authService.getUsuarios().subscribe({
      next: (data: IUsers) => {
        this.data = data;
        // console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  searchUser(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((value): value is string => value !== null),
        debounceTime(1000),
        distinctUntilChanged(),
        exhaustMap((searchString: string) =>
          this.authService
            .getUsuarios()
            .pipe(
              map((users) =>
                users.filter((user: IUsers) =>
                  user.namelast
                    ?.toLowerCase()
                    .includes(searchString.toLowerCase())
                )
              )
            )
        )
      )
      .subscribe((res) => {
        this.data = res;
      });
  }

  exportCSV(): void {
    this.authService.getUsuarios().subscribe((usuarios) => {
      const headers = ['Nombre', 'Email', 'Último Login', 'Último Logout'];
      const rows = usuarios.map((u: any) => [
        `"${u.namelast}"`,
        `"${u.email}"`,
        `"${new Date(u.ultimo_login).toLocaleString()}"`,
        `"${new Date(u.ultimo_logout).toLocaleString()}"`,
      ]);

      const csvArray = [headers, ...rows];

      const BOM = '\uFEFF';

      const csvContent = BOM + csvArray.map((e) => e.join(';')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'usuarios.csv';
      link.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
