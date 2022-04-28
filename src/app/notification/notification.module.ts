import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatModule } from '../mat/mat.module';

import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }