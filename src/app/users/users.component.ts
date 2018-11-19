import { Component, OnInit } from '@angular/core';
import { IAppUser } from '../interfaces/IAppUser';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public appUsers: IAppUser[] = [] as Array<IAppUser>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(appUsers => {
      this.appUsers = appUsers;
    });
  }

}
