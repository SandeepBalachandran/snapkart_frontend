import { HttpClientModule } from '@angular/common/http'
import { DebugElement } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import { Location } from '@angular/common'

import { HeaderComponent } from './header.component'
import { routes } from 'src/app/app-routing.module'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  let loginDe: DebugElement
  let inputBoxDe: DebugElement
  let loginBtn: HTMLElement

  let router: Router

  let location: Location
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      providers: [SnapService, AuthService],
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    loginDe = fixture.debugElement.query(By.css('.login-btn'))
    inputBoxDe = fixture.debugElement.query(By.css('.search-box'))
    loginBtn = loginDe.nativeElement
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain "SnapKart"', () => {
    const textEle: DebugElement = fixture.debugElement
    const logoText: HTMLElement = textEle.nativeElement
    const h1 = logoText.querySelector('h1')
    expect(h1?.textContent).toEqual('SnapKart')
  })

  it('should call the login function once when clicking login button', () => {
    spyOn(component, 'login')
    loginDe.triggerEventHandler('click')
    expect(component.login).toHaveBeenCalledTimes(1)
  })

  it('should route to auth component when clicking login button', fakeAsync(() => {
    loginDe.triggerEventHandler('click')
    tick()
    expect(location.path()).toBe('/auth')
  }))

  it('should check input box is exist in the header component', () => {
    expect(inputBoxDe).toBeTruthy()
  })
})
