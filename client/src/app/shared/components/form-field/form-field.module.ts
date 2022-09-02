import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormFieldComponent } from './form-field.component';
import { ControlErrorMessageModule } from '../../pipes';
import { ShowPasswordModule } from '../../directives';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ControlErrorMessageModule,
    ShowPasswordModule,
  ],
  exports: [FormFieldComponent],
})
export class FormFieldModule {}
