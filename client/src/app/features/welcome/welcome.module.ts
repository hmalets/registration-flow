import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './pages/welcome-page';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
