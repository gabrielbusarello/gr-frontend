import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { ExpenseService } from '../../services/expense.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ExpenseResponse } from 'src/app/shared/expense.model';
import { DefaultResponse } from 'src/app/shared/app.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass'],
  providers: [ ExpenseService ]
})
export class ExpensesComponent implements OnInit {

  public expenses: Array<ExpenseResponse>;

  constructor( private expenseService: ExpenseService, private modalService: NgbModal, private utils: UtilsService) { }

  ngOnInit() {
    this.getExpenses();
  }

  private getExpenses(): void {
    this.expenseService.getExpenses()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ExpenseResponse>>) => {
          this.expenses = response.data;
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.message);
        }
      );
  }

  /**
   * delete
   * @param id: number
   * @param name: string
   */
  public delete(id: number, name: string) {
    const modal = this.modalService.open(DeleteComponent, { centered: true });
    modal.componentInstance.name = name;
    modal.result.then(resultado => {
      if (resultado.status) {
        this.expenseService.deleteExpense(id)
          .subscribe(
            (response: DefaultResponse<ExpenseResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getExpenses();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.message);
            }
          );
      }
    }, () => {});
  }

}
