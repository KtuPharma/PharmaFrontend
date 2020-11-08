import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataListComponent } from './data-list/data-list.component';
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

const routes: Routes = [
  { path: '', component: LoginComponent},
  {path: 'admin/orders', component: AdminOrdersComponent},
  {path: 'admin/users', component: AdminUsersComponent},
  {path: 'admin/suppliers', component: AdminSuppliersComponent},
  {path: 'admin/pharmacies', component: AdminPharmaciesComponent},
  {path: 'pharmacist/analytics', component: PharmacistAnalyticsComponent},
  {path: 'pharmacist/orders', component: PharmacistOrdersComponent},
  {path: 'pharmacist/stock', component: PharmacistStockComponent},
  {path: 'delivery-man/orders', component: DeliveryManOrdersComponent},
  {path: 'storeman/stock', component: StoremanStockComponent},
  {path: 'storeman/orders', component: StoremanOrdersComponent},
  {path: 'storeman/medicine-list', component: StoremanMedicineListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
