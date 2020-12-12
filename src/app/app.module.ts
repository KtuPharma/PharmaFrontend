import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-header/header.component';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { RoleGuardService } from './auth/role-guard.service';

//Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/orders/orders.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminSuppliersComponent } from './admin/suppliers/suppliers.component';
import { AdminPharmaciesComponent } from './admin/pharmacies/pharmacies.component';
import { PharmacistOrdersComponent } from './pharmacist/orders/orders.component';
import { PharmacistStockComponent } from './pharmacist/stock/stock.component';
import { PharmacistAnalyticsComponent } from './pharmacist/analytics/analytics.component';
import { DeliveryManOrdersComponent } from './deliveryman/orders/orders.component';
import { StoremanStockComponent } from './storeman/stock/stock.component';
import { StoremanOrdersComponent } from './storeman/orders/orders.component';
import { StoremanMedicineListComponent } from './storeman/medicine-list/medicine-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MessagesComponent } from './pharmacist/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminSuppliersComponent,
    AdminPharmaciesComponent,
    PharmacistOrdersComponent,
    PharmacistStockComponent,
    PharmacistAnalyticsComponent,
    DeliveryManOrdersComponent,
    StoremanStockComponent,
    StoremanOrdersComponent,
    StoremanMedicineListComponent,
    HomePageComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
