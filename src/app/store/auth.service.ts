import { Injectable } from '@angular/core'
import { BehaviorSubject, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus$ = new BehaviorSubject<boolean>(this.isLoggedIn())
  currentLoginStatus$ = this.loginStatus$.asObservable()

  changeLoginStatus(state: boolean) {
    this.loginStatus$.next(state)
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  get(key: string) {
    return localStorage.getItem(key)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }

  isLoggedIn() {
    const token = localStorage.getItem('token') // get token from local storage
    if (token) {
      const payload = atob(token.split('.')[1]) // decode payload of token
      const parsedPayload = JSON.parse(payload) // convert payload into an Object
      // console.log(parsedPayload, Date.now() / 1000)
      return parsedPayload.exp > Date.now() / 1000 // check if token is expired
    }
    return false
  }
}
