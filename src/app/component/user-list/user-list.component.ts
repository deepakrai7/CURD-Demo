import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { DataService } from 'src/app/service/data.service';
import { UserServicesService } from 'src/app/service/user-services.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserServicesService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(use => 
        this.users = use
      )
  }

  addUser() {
    this.router.navigate(['/user-form']);
  }

  editUser(userId: string) {
    this.router.navigate(['/user-form', userId]);
    console.log('Edit user with ID:', userId);
  }

  deleteUser(userId: string) {
    // Implement the deleteUser logic here
    console.log('Delete user with ID:', userId);
  }

}
