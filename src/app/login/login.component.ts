import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    cpf: new FormControl(null, [ Validators.required ]),
    pass: new FormControl(null, [ Validators.required ])
  });

  public mensagemErro: string;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  public login() {
    if (this.form.controls.cpf.value === '123' && this.form.controls.pass.value === '123') {
      this.router.navigate(['/']);
    } else {
      this.mensagemErro = 'Matrícula/CPF ou senha errados';
    }
  }

}
