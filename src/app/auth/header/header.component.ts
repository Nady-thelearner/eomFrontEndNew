import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private userSF: UserService) {}


  private initialize() {
    // Initialization logic here
    this.isAuthenticated = this.userSF.getAuthenticated();

  }

  ngOnInit(): void {
    this.isAuthenticated = this.userSF.getAuthenticated();
    this.userSF
      .getAuthStatus()
      .subscribe((isAuth) => (this.isAuthenticated = isAuth));
  }

  onlogout() {
    this.userSF.logout();
    this.initialize();
  }
}
