import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/service/user-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any;

  constructor(private userService: UserServicesService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(use => 
      this.users = use
      )
  }
}
