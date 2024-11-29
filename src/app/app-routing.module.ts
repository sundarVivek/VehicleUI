import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { TrackVehicleComponent } from './customer-panel/track-vehicle/track-vehicle.component';
import { AdminHomeComponent } from './admin-panel/admin-home/admin-home.component';
import { AddServiceComponent } from './admin-panel/admin-home/add-service/add-service.component';
import { ChangeStatusComponent } from './admin-panel/admin-home/change-status/change-status.component';
import { RegisterComponent } from './user/login/register/register.component';
import { ViewServiceComponent } from './admin-panel/view-service/view-service.component';
import { EditServiceComponent } from './admin-panel/edit-service/edit-service.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { AdminRegistrationComponent } from './admin-panel/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { LogoutComponent } from './logout/logout.component';
import { GetServiceComponent } from './admin-panel/admin-home/get-service/get-service.component';
import { DerviceSuccessComponent } from './customer-panel/dervice-success/dervice-success.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { NewAddServiceComponent } from './admin-panel/new-add-service/new-add-service.component';
import { AdminRegisterComponent } from './admin-panel/admin-register/admin-register.component';
import { AddVehicleComponent } from './admin-panel/add-vehicle/add-vehicle.component';
import { VehicleServiceDetailsComponent } from './admin-panel/vehicle-service-details/vehicle-service-details.component';
import { ServiceHistoryPdfComponent } from './pdf/service-history-pdf/service-history-pdf.component';

const routes: Routes = [
  { path: '', redirectTo: 'select-user', pathMatch: 'full' },
  { path: 'select-user', component: SelectUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'track-vehicle/:id', component: TrackVehicleComponent },
  { path: 'success', component: DerviceSuccessComponent },
  { 
    path: 'service-details-summary/:id', 
    component: ServiceHistoryPdfComponent 
  },
  // { path: 'admin-home/:id', component: AdminHomeComponent,canActivate: [AuthGuard] },

    //admin
  {
    path: 'admin',
    children: [
  { path: 'admin-home/:id', component: AdminHomeComponent,canActivate: [AuthGuard]},
  { path: 'reg', component: AdminRegisterComponent },
  { path: 'login', component: AdminLoginComponent },
  { path:'add-vehicle/:id',component:AddVehicleComponent,canActivate:[AuthGuard]},
  { path: 'add-service', component: AddServiceComponent },
  { path: 'new-add-service/:id', component: NewAddServiceComponent,canActivate: [AuthGuard]},
  { path: 'change-status/:id', component: ChangeStatusComponent,canActivate: [AuthGuard] },
  { path: 'vehicle-service-details/:id', component: VehicleServiceDetailsComponent,canActivate: [AuthGuard] },
  { path: 'get-service/:id', component: GetServiceComponent,canActivate: [AuthGuard] },
  { path: 'view-service/:id', component: ViewServiceComponent,canActivate: [AuthGuard] },
  { path: 'edit-service/:id', component: EditServiceComponent,canActivate: [AuthGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
