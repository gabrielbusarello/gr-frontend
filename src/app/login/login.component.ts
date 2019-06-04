import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    matCpf: new FormControl(null, [ Validators.required ]),
    pass: new FormControl(null, [ Validators.required ])
  });

  constructor() { }

  ngOnInit() {
  }

}
