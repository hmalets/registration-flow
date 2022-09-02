import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPageComponent } from './pages/registration-page';
import { FormFieldModule, LoaderModule } from '../../shared/components';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormFieldModule,
    LoaderModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class RegistrationModule {}
