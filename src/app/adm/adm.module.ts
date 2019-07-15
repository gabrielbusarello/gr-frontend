import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
    EditExpensesComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbModalModule,
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
  ]
})
export class AdmModule { }
