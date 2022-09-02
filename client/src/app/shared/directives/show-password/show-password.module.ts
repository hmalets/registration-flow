import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowPasswordDirective } from './show-password.directive';

@NgModule({
  declarations: [ShowPasswordDirective],
  imports: [CommonModule],
  exports: [ShowPasswordDirective],
})
export class ShowPasswordModule {}
