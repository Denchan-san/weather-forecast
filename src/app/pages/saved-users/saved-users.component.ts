import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styleUrl: './saved-users.component.css'
})
export class SavedUsersComponent implements OnInit{

  savedUsers: User[] = [];

  ngOnInit() {
    this.fetchSavedUsers();
  }

  fetchSavedUsers() {
    const users = localStorage.getItem('users');

    this.savedUsers = users ? JSON.parse(users) : [];

    this.savedUsers = this.savedUsers.filter((user, index, self) =>
      index === self.findIndex((u) => JSON.stringify(u) === JSON.stringify(user))
    );
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
  }
}
