import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDoctorGuard } from '../guards/auth-doctor.guard';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';

const routes: Routes = [
  {
    path: 'doctor', component: DoctorComponent, canActivate: [AuthDoctorGuard],
    children: [
      { path: '', redirectTo: 'prescription', pathMatch: 'full' },
      { path: 'prescription', component: PrescriptionComponent },
      { path: 'profile', component: DoctorProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }