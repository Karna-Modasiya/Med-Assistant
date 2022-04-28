import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatModule } from '../mat/mat.module';
import { DoctorRoutingModule } from './doctor-routing.module';
import { AuthDoctorGuard } from '../guards/auth-doctor.guard';
import { FormsModule } from '@angular/forms';

import { DoctorComponent } from './components/doctor/doctor.component';
// import { DoctorNavComponent } from './components/doctor-nav/doctor-nav.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';

@NgModule({
  declarations: [
    DoctorComponent,
    PrescriptionComponent,
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    DoctorRoutingModule,
    FormsModule
  ],
  providers: [
    AuthDoctorGuard
  ],
  exports: [
    DoctorComponent,
    PrescriptionComponent
  ]
})
export class DoctorModule { }
