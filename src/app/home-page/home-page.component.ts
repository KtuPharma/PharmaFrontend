import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { google } from '@google/maps';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit {
  user: any;
  lat = 54.926797;
  lng = 23.798045;
  origin = { lat: 54.926797, lng: 23.798045 };
  destination = { lat: 54.903363, lng: 23.95799 };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
  }
}
