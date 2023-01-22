import { Component, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import constants from 'src/app/_utils/constants'

export interface LoginResponse {
  token: string
  user: { email: string; firstname: string; _id: string }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  submitted: boolean = false
  constructor(private fb: UntypedFormBuilder, private auth: AuthService, private snapservice: SnapService, private route: Router) {}
  loading = false
  loginForm!: UntypedFormGroup
  registerForm!: UntypedFormGroup
  registerEnabled: boolean = false
  ngOnInit(): void {
    this.initLoginFrom()
    this.initRegisterForm()
  }
  initLoginFrom = () => {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [true],
    })
  }

  initRegisterForm = () => {
    this.registerForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    })
  }

  get registerFormControls() {
    return this.registerForm.controls
  }

  get loginFormControls() {
    // console.log(this.loginForm.controls)
    return this.loginForm.controls
  }

  onLogin = () => {
    this.submitted = true
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    const body = {
      url: constants.login,
      body: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    }
    this.snapservice.httpPost(body).subscribe((result: any) => {
      console.log(result)
      this.auth.set('token', result.token)
      this.auth.set('user', result.user._id)
      this.auth.changeLoginStatus(true)
      this.route.navigate(['/products'])
    })
  }

  onRegister = () => {
    this.submitted = true
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return
    }
    const body = {
      url: constants.register,
      body: {
        firstname: this.registerForm.value.firstname,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    }
    this.snapservice.httpPost(body).subscribe((result) => {
      // console.log(result)
    })
  }

  toggleLogin = () => {
    // debugger
    this.registerEnabled = !this.registerEnabled
    this.loginForm.controls
    this.submitted = false
  }
}
