import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { HeaderComponent } from './header/header.component';
import { AdmComponent } from './adm.component';

@NgModule({
  declarations: [HeaderComponent, AdmComponent],
  imports: [
    CommonModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
