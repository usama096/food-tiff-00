import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users-model';
import { UsersService } from '../../services/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  title = "Users List"
  imageWidth = 50;
  search = new FormControl;
  imageMargin = 2;
  errorMessage!: string
  users!: Users;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobileNumber', 'isActive', 'userType', 'profileImgUrl', 'action'];
  dataSource: any = [];
  isActive!: boolean;


  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public shared: SharedService,
  ) {
    this.userService.getUsers().subscribe((data: Users[]) => {
      this.dataSource = data;
      this.search.valueChanges.pipe(debounceTime(500)).subscribe((searchValue) => {
        this.dataSource = data.filter(val => val.firstName.toLowerCase().includes(searchValue));
      })
    });

  }
  addUser() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
  reset() {
    this.search.reset()
  }

  deleteUser(user: Users): void {

    let data = {
      value: user.firstName,
      title: 'Delete user',
      button: 'Delete',
      description: 'Do you realy want to Delete',
      id: user.id
    }
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.userService.deleteUser(data.id).subscribe({
          next: () => {
            this.userService.getUsers().subscribe((data: any) => {
              this.dataSource = data;
            });
          },
          error: err => this.errorMessage = err

        });
      }
    })
  }
}
