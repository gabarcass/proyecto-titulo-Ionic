import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      this.authSrv.login(this.form.value)
    } else {
      window.alert('revise los campos')
    }
  }
}
