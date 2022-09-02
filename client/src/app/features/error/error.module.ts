import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorPageComponent } from './pages';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, ErrorRoutingModule, MatButtonModule],
})
export class ErrorModule {}
