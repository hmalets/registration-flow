import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiModule } from './api/api.module';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './components';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ApiModule, RouterModule, MaterialModule],
  exports: [LayoutComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
