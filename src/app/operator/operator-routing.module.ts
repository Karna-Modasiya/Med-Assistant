import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOperatorGuard } from '../guards/auth-operator.guard';
import { OperatorComponent } from './components/operator/operator.component';

const routes: Routes = [
  {
    path: 'operator', component: OperatorComponent, canActivate: [AuthOperatorGuard],
    // children: [
    //   { path: '', redirectTo: 'prescription', pathMatch: 'full' },
    //   { path: 'prescription', component: PrescriptionComponent },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }