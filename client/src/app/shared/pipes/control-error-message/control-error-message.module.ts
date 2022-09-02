import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorMessagePipe } from './control-error-message.pipe';

@NgModule({
  declarations: [ControlErrorMessagePipe],
  imports: [CommonModule],
  exports: [ControlErrorMessagePipe],
})
export class ControlErrorMessageModule {}
