import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmComponent } from './adm.component';
import { HomeComponent } from './home/home.component';

import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

import { ExpensesComponent } from './expenses/expenses.component';
import { EditExpensesComponent } from './expenses/edit-expenses/edit-expenses.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
