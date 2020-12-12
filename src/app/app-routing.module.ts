import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';

import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/orders/orders.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminSuppliersComponent } from './admin/suppliers/suppliers.component';
import { AdminPharmaciesComponent } from './admin/pharmacies/pharmacies.component';
import { PharmacistAnalyticsComponent } from './pharmacist/analytics/analytics.component';
import { PharmacistOrdersComponent } from './pharmacist/orders/orders.component';
import { PharmacistStockComponent } from './pharmacist/stock/stock.component';
import { DeliveryManOrdersComponent } from './deliveryman/orders/orders.component';
import { StoremanStockComponent } from './storeman/stock/stock.component';
import { StoremanOrdersComponent } from './storeman/orders/orders.component';
import { StoremanMedicineListComponent } from './storeman/medicine-list/medicine-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MessagesComponent } from './pharmacist/messages/messages.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'admin/suppliers',
    component: AdminSuppliersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'admin/pharmacies',
    component: AdminPharmaciesComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'pharmacist/analytics',
    component: PharmacistAnalyticsComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'pharmacist/orders',
    component: PharmacistOrdersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'pharmacist/stock',
    component: PharmacistStockComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'pharmacist/messages',
    component: MessagesComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'delivery-man/orders',
    component: DeliveryManOrdersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'storeman/stock',
    component: StoremanStockComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'storeman/orders',
    component: StoremanOrdersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'storeman/medicine-list',
    component: StoremanMedicineListComponent,
    canActivate: [RoleGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
