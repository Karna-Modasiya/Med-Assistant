import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './components/operator/operator.component';
import { AuthOperatorGuard } from '../guards/auth-operator.guard';

import { MatModule } from '../mat/mat.module';

@NgModule({
  declarations: [
    OperatorComponent
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    MatModule
  ],
  providers: [
    AuthOperatorGuard
  ],
})
export class OperatorModule { }
