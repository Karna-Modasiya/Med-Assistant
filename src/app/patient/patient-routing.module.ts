import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPatientGuard } from '../guards/auth-patient.guard';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';

const routes: Routes = [
  {
    path: 'patient', component: PatientComponent, 
    canActivate: [AuthPatientGuard],
    children: [
      { path: '', redirectTo: 'history', pathMatch: 'full' },
      { path: 'history', component: PatientHistoryComponent },
      { path: 'profile', component: PatientProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }