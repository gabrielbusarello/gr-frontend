import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmComponent } from './adm.component';
import { HomeComponent } from './home/home.component';

import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { EditServiceTypeComponent } from './service-type/edit-service-type/edit-service-type.component';

import { ExpensesComponent } from './expenses/expenses.component';
import { EditExpensesComponent } from './expenses/edit-expenses/edit-expenses.component';

import { WorkToolsComponent } from './work-tools/work-tools.component';
import { EditWtComponent } from './work-tools/edit-wt/edit-wt.component';

const routes: Routes = [
  { path: '', component: AdmComponent, children:
    [
      { path: '', component: HomeComponent },
      { path: 'usuarios', children:
        [
          { path: '', component: UsersComponent },
          { path: 'editar', component: EditUserComponent },
          { path: 'editar/:id', component: EditUserComponent }
        ]
      },
      { path: 'despesas', children:
        [
          { path: '', component: ExpensesComponent },
          { path: 'editar', component: EditExpensesComponent },
          { path: 'editar/:id', component: EditExpensesComponent }
        ]
      },
      { path: 'ferramentas', children:
        [
          { path: '', component: WorkToolsComponent },
          { path: 'editar', component: EditWtComponent },
          { path: 'editar/:id', component: EditWtComponent }
        ]
      },
      { path: 'tipo-servico', children:
        [
          { path: '', component: ServiceTypeComponent },
          { path: 'editar', component: EditServiceTypeComponent },
          { path: 'editar/:id', component: EditServiceTypeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
