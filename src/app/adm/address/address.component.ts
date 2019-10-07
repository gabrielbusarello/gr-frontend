import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import User, { UserResponse } from 'src/app/shared/user.model';
import Address from 'src/app/shared/address.model';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';
import { DefaultResponse } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass'],
  providers: [ UserService ]
})
export class AddressComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    id:         new FormControl({ value: null, disabled: true }),
    cep:        new FormControl(null, [ Validators.required, Validators.maxLength(8) ]),
    street:     new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    number:     new FormControl(null, [ Validators.required, Validators.maxLength(20) ]),
    complement: new FormControl(null, [ Validators.maxLength(50) ]),
    district:   new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    city:       new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    state:      new FormControl(null, [ Validators.required, Validators.maxLength(2) ])
  });

  public blockSend: boolean;

  constructor( public activeModal: NgbActiveModal, private userService: UserService, private utils: UtilsService ) { }

  ngOnInit() {
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const address: Address = new Address(
      this.form.controls.id.value,
      this.form.controls.cep.value,
      this.form.controls.street.value,
      this.form.controls.number.value,
      this.form.controls.complement.value,
      this.form.controls.district.value,
      this.form.controls.city.value,
      this.form.controls.state.value
    );
    const user: User = new User(
      localStorage.getItem('cpf'),
      localStorage.getItem('nomeUsuario'),
      localStorage.getItem('emailUsuario'),
      '',
      '',
      localStorage.getItem('permissao'),
      address
    );

    this.userService.sendUser(user, Number.parseInt(localStorage.getItem('idUsuario'), 10))
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<UserResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.activeModal.close({ endereco: response.data.endereco });
          localStorage.setItem('endereco', JSON.stringify(response.data.endereco));
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
