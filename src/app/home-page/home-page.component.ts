import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
  }
}
