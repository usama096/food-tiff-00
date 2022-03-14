import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CodelistItem } from 'src/app/shared/models/codelists-model';
import { RefDataService } from 'src/app/shared/services/ref-data.service';
import { User, UsersResolved } from '../../models/users-model';
import { UsersService } from '../../services/user.service';
import { addUser, updateUser } from '../../state/user.action';
import { UserState } from '../../state/user.reducer';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Add new User';
  usersForm!: FormGroup;
  isReadOnlyMode: boolean = false;
  isUpdateMode!: boolean;
  userId!: number;
  user!: User;
  errorMessage!: string;
  isActive: boolean = false;
  fileName!: string;
  userState!: UserState;
  userStateSub!: Subscription;
  userType: CodelistItem[] = [];
  imageSrc!: string |null | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private refDataService: RefDataService,
    private store: Store,
    private fileUploadService: FileUploadService,
  ) {

    this.usersForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      id: [],
      isActive: true,
      imageId: [''],
      userType: ['', [Validators.required]],
    });
    this.userService.getUsers().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngOnInit(): void {
    this.userStateSub = this.store.select((state: any) => state.user).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.userState = res;
      }
    )

    this.refDataService.getUserType().subscribe((res) => {
      this.userType = res.filter(user =>{
        return user.code !== 'CU' && user.code !== 'SA';
      });
    })
    this.route.data.subscribe((data) => {
      const resolvedData: UsersResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      if (resolvedData.user) this.onProductRetrieved(resolvedData.user);
    });
  }

  ngOnDestroy(): void {
    this.userStateSub.unsubscribe();
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.usersForm.controls[controlName];
    if (!control) return false;
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  onFileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file, file.name);
        this.fileUploadService.uploadFile(formData).subscribe((res) => {
          this.imageSrc = res.downloadUrl;
          this.usersForm.get('imageId')?.setValue(res.id);
        })
      }
    }
  }


  onProductRetrieved(user: User) {
    this.user = user;
    this.usersForm.patchValue({ ...this.user });
    this.imageSrc = user.image?.downloadUrl;

    const id = this.route.snapshot.paramMap.get('id');
    if (!this.user) {
      this.pageTitle = 'No User Found';
    } else {
      if (!id) {
        this.pageTitle = 'Add New User';
      } else {
        this.userId = +id!;
        this.pageTitle = this.user.firstName;
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
    this.user = null!;
  }

  addUser() {
    let user = { ...this.usersForm.value };
    let id = this.userId;
    if (!this.userId) {
      this.store.dispatch(addUser({ user }));
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.store.dispatch(updateUser({ user,id }));
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }
}
