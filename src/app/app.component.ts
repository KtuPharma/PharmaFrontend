import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'vaistine';

  constructor(private auth: AuthService) {}

  get signedInUser() {
    return this.auth.loggedIn();
  }
}
