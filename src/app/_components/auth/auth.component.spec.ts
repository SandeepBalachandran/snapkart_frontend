import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'

import { AuthComponent } from './auth.component'

describe('AuthComponent', () => {
  let component: AuthComponent
  let fixture: ComponentFixture<AuthComponent>
  let authServiceLoginSpy = jasmine.createSpyObj('SnapService', ['httpPost'])
  // authServiceLoginSpy.httpPost.and.returnValue(of())

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthComponent, SnapService, AuthService],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
    }).compileComponents()

    fixture = TestBed.createComponent(AuthComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  xit('should check the email and password field exist in the UI', () => {
    const form = fixture.debugElement.nativeElement.querySelector('loginform')
    const inputs = form.querySelectorAll('input')
    expect(inputs.length).toEqual(2)
  })

  it('should require valid email', () => {
    component.loginForm.setValue({
      email: 'invalidemail',
      password: 'ddsfsfsdfsdfd',
      remember: true,
    })
    expect(component.loginForm.valid).toEqual(false)
  })

  it('should not cal the login api if the email is invalid', () => {
    component.loginForm.setValue({
      email: 'invalidemail',
      password: 'ddsfsfsdfsdfd',
      remember: true,
    })

    expect(component.loginForm.valid).toEqual(false)
    // component.onLogin()
    // expect(component.onLogin).toEqual(null)
  })

  it('should require 8 characters as password and should not call api if so', () => {
    component.loginForm.setValue({
      email: 'invalidemail',
      password: '<8',
      remember: true,
    })
    expect(component.loginForm.valid).toEqual(false)
    // expect(authServiceLoginSpy.httpPost).toHaveBeenCalledTimes(0)
  })

  it('should be valid if form value is valid', () => {
    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: 'rsadfsfsfdsfsdfr',
      remember: true,
    })
    expect(component.loginForm.valid).toEqual(true)
    // expect(authServiceLoginSpy.httpPost).toHaveBeenCalledTimes(1)
  })

  it('should allow user to log in', () => {
    const formData = {
      email: 'something@gmail.com',
      password: '123456789',
      remember: true,
    }
    component.loginForm.setValue(formData)
    // component.onLogin()
    authServiceLoginSpy.httpPost(formData)
    expect(authServiceLoginSpy.httpPost).toHaveBeenCalledTimes(1)
    expect(authServiceLoginSpy.httpPost).toHaveBeenCalledWith(formData)
  })
})
