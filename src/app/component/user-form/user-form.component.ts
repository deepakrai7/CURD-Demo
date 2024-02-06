import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserServicesService } from 'src/app/service/user-services.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userId!: string;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserServicesService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
    });
    this.initializeForm();
  }

  getUserData() {
    // Call your UserService to fetch user data by ID
    this.userService.getUserById(this.userId).subscribe(data => {
      this.userData = data;
      this.populateForm();
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required]
      })
    });
  }

  populateForm() {
    if (this.userData) {
      this.userForm.patchValue({
        firstName: this.userData.name,
        lastName: this.userData.username,
        email: this.userData.email,
        address: {
          street: this.userData.address.street,
          city: this.userData.address.city,
          zipcode: this.userData.address.zipcode
        }
      });
    }
  }

  onAddUser() {
    if (this.userForm.valid) {
      // Perform add user logic here
      console.log('Adding user:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onEditUser() {
    if (this.userForm.valid) {
      // Perform edit user logic here
      console.log('Editing user:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
