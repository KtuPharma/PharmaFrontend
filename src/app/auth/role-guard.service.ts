import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return (
      this.getRouteRole(route.url[0].path) === this.auth.getUserInfo().role
    );
  }

  private getRouteRole(urlRole: string): string {
    let role: string;
    switch (urlRole) {
      case 'admin':
        role = 'Admin';
        break;
      case 'pharmacist':
        role = 'Pharmacy';
        break;
      case 'delivery-man':
        role = 'Transportation';
        break;
      case 'storeman':
        role = 'Warehouse';
        break;
    }
    return role;
  }
}
