import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  role: string;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.role = this.auth.getUserInfo().role;
  }

  logout() {
    this.auth.logoutUser();
  }
}
