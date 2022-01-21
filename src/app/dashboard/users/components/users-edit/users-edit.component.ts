import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Users, UsersResolved } from '../../models/users-model';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  pageTitle = 'Add new User';
  usersForm!: FormGroup;
  isReadOnlyMode: boolean = false;
  isUpdateMode: boolean = false;
  userId!: number;
  users!: Users;
  errorMessage!: string;
  isActive: boolean = false;
  fileName!: string;
  userType = ['Customer', 'Admin', 'Delivery Boy'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
    this.usersForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      id: [],
      isActive: true,
      userType: ['', [Validators.required]],
      profileImgUrl: ['', [Validators.required]],
    });
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData: UsersResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      if (resolvedData.users) this.onProductRetrieved(resolvedData.users);
    });
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.usersForm.controls[controlName];
    if (!control) return false;
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  onFileUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file, file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.usersForm
            .get('profileImgUrl')
            ?.setValue(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onProductRetrieved(user: Users) {
    this.users = user;
    this.usersForm.patchValue({ ...this.users });

    const id = this.route.snapshot.paramMap.get('id');
    if (!this.users) {
      this.pageTitle = 'No User Found';
    } else {
      if (!id) {
        this.pageTitle = 'Add New User';
      } else {
        this.userId = +id!;
        this.pageTitle = `${this.users.firstName}`;
      }
    }
    const url = this.router.url;
    if (url === `/dashboard/users/${id}`) {
      this.isReadOnlyMode = true;
    }
    if (url === `/dashboard/users/${id}/edit`) {
      this.isUpdateMode = true;
    }
  }

  reset(): void {
    this.users = null!;
  }

  addUser() {
    this.users = this.usersForm.value;
    if (!this.userId) {
      this.userService.createUser(this.users).subscribe({
        next: () => {
          this.reset();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.userService.updateUser(this.users).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }
}
