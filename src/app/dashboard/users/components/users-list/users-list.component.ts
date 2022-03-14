import { deleteUser, getUsers } from './../../state/user.action';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/users-model';
import { UsersService } from '../../services/user.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CodeListService } from 'src/app/dashboard/code-lists/services/codeList.service';
import { CodelistItem } from 'src/app/shared/models/codelists-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  title = "Users List"
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageWidth = 50;
  selectUserTypeCtrl = new FormControl('!CU');
  searchUserByCtrl = new FormControl();
  searchValueCtrl = new FormControl();
  isUserActiveCtrl = new FormControl(true);
  imageMargin = 2;
  errorMessage!: string
  user!: User;
  userState!: any[];
  userStateSub!: Subscription;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'isActive', 'userType', 'profileImgUrl', 'action'];
  dataSource: any = [];
  isActive!: boolean;
  userType = [{ code: '!CU', description: 'Staff' }, { code: 'CU', description: 'Customers' }];
  userList: CodelistItem[] = [];

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public shared: SharedService,
    private store: Store,
    private codeListService: CodeListService,

  ) {
    this.codeListService.getSearchByUser().subscribe((user) => {
      this.userList = user;
    })

  }
  addUser() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.userStateSub = this.store.select((state: any) => state.user).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.userState = res.users;
       this.dataSource = res.users?.filter((user: any) => {
          return user.userType !== 'CU'
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.userStateSub.unsubscribe();
  }
  selectUserType(e: any) {
    this.userService.searchUserBy(e.value).subscribe((users) => {
      this.dataSource = users;
      this.searchValueCtrl.reset();
      this.searchUserByCtrl.reset();
    });
  }

  searchUsersBy(e: any) {
    this.searchUserByCtrl.setValue(e.value);
  }
  searchUsers() {
    let userType = this.selectUserTypeCtrl.value;
    let propertyName = this.searchUserByCtrl.value;
    let value = this.searchValueCtrl.value;
    let activeOnly = this.isUserActiveCtrl.value;
    this.userService.searchUserBy(userType, propertyName, value, activeOnly).subscribe((users) => {
      this.dataSource = users;
    })

  }

  deleteUser(user: User): void {
    let data = {
      value: user.firstName,
      title: 'Delete user',
      button: 'Delete',
      description: 'Do you realy want to Delete',
      id: user.id
    }
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      const id = data.id!;
      if (res === true) {
        this.store.dispatch(deleteUser({ id }));
        this.store.dispatch(getUsers());
      }
    })
  }
}
