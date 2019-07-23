import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ExpenseService } from 'src/app/services/expense.service';
import Expense, { ExpenseResponse } from 'src/app/shared/expense.model';
import { DefaultResponse, PRICE_REGEXP } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePickerFormatter } from 'src/app/shared/date-picker-formatter.util';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.sass'],
  providers: [ ExpenseService ]
})
export class EditExpensesComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    id:           new FormControl({ value: null, disabled: true }),
    name:         new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    description:  new FormControl(null, [ Validators.maxLength(1000) ]),
    date:         new FormControl(null, [ Validators.required, Validators.maxLength(10) ]),
    hour:         new FormControl(null, [ Validators.maxLength(8) ]),
    price:        new FormControl(null, [ Validators.required, Validators.maxLength(10), Validators.pattern(PRICE_REGEXP) ])
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private utils: UtilsService,
    private datePickerFormatter: DatePickerFormatter
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.getExpenseById(param.id);
      } else {
        this.new = true;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  private getExpenseById(id: number): void {
    this.expenseService.getExpenseById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ExpenseResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.name.setValue(response.data.nome, { onlySelf: true });
            this.form.controls.description.setValue(response.data.descricao, { onlySelf: true });
            this.form.controls.date.setValue(this.datePickerFormatter.parseFromAPI(response.data.data.split('T')[0]), { onlySelf: true });
            this.form.controls.hour.setValue(response.data.hora, { onlySelf: true });
            this.form.controls.price.setValue(response.data.valor.toString().replace('.', ','), { onlySelf: true });
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/despesas']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem);
          this.router.navigate(['/despesas']);
        }
      );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const expense: Expense = new Expense(
      this.form.controls.name.value,
      this.form.controls.description.value,
      this.datePickerFormatter.formatToAPI(this.form.controls.date.value),
      this.form.controls.hour.value,
      this.form.controls.price.value.replace(',', '.')
    );

    this.expenseService.sendExpense(expense, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ExpenseResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/despesas']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem);
        }
      );
  }

}
