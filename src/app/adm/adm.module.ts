import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbModalModule, NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerFormatter } from '../shared/date-picker-formatter.util';

import { AdmRoutingModule } from './adm-routing.module';
import { HeaderComponent } from './header/header.component';
import { AdmComponent } from './adm.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ExpensesComponent } from './expenses/expenses.component';
import { EditExpensesComponent } from './expenses/edit-expenses/edit-expenses.component';
import { WorkToolsComponent } from './work-tools/work-tools.component';
import { EditWtComponent } from './work-tools/edit-wt/edit-wt.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { EditServiceTypeComponent } from './service-type/edit-service-type/edit-service-type.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditScheduleComponent } from './schedule/edit-schedule/edit-schedule.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AdmComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    UsersComponent,
    EditUserComponent,
    DeleteComponent,
    ExpensesComponent,
    EditExpensesComponent,
    WorkToolsComponent,
    EditWtComponent,
    ServiceTypeComponent,
    EditServiceTypeComponent,
    ScheduleComponent,
    EditScheduleComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbDatepickerModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    NgSelectModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [ DeleteComponent ],
  exports: [
    DeleteComponent
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: DatePickerFormatter }, DatePickerFormatter]
})
export class AdmModule { }
