import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap, tap } from 'rxjs'
import { AuthService } from 'src/app/store/auth.service'
import { DropDownAnimation } from 'src/app/_animations/menuItem'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import constants from 'src/app/_utils/constants'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [DropDownAnimation],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false
  constructor(private snapService: SnapService, private route: Router, private authService: AuthService) {}
  searchFn!: Observable<any>
  loginStatus$!: Observable<any>
  isUserLoggedIn: boolean = false
  dropdownData = ['profile', 'logout']

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait definte time after each keystorke before considering the term

      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string): any =>
        this.snapService
          .httpGet({
            url: `${constants.search}/${term}`,
          })
          .subscribe((ele) => {
            // console.log(ele)
          })
      )
    )
    this.checkLoginStatus()
  }
  private searchTerms = new Subject<string>()

  // Push a search term into observable stream
  onSearch(value: string): void {
    // console.log(value)
    this.searchTerms.next(value)
  }

  gotoProfile = () => {}

  login = () => {
    this.route.navigate(['/auth'])
  }
  logout = () => {
    this.authService.remove('token')
    this.authService.changeLoginStatus(false)
    this.route.navigate(['/auth'])
  }

  checkLoginStatus() {
    this.loginStatus$ = this.authService.currentLoginStatus$
    this.loginStatus$.subscribe((state) => (this.isUserLoggedIn = state))
  }

  isLoggedIn() {
    this.isAuthenticated = this.authService.isLoggedIn()
    // this.authService.isLoggedIn().subscribe((state: any) => {
    //   this.isAuthenticated = state
    // })
    // console.log(this.isAuthenticated)
    return this.isAuthenticated
  }
}
