import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HeaderComponent } from './_components/header/header.component'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ProductListComponent } from './_components/product-list/product-list.component'
import { ProductComponent } from './_components/product/product.component'
import { ProfileComponent } from './_components/profile/profile.component'
import { AuthComponent } from './_components/auth/auth.component'
import { AuthInterceptor } from './_interceptors/auth/auth-interceptor.interceptor'
import { LoaderInterceptor } from './_interceptors/loader/loader.interceptor'
import { LoaderComponent } from './_components/loader/loader.component'
import { AutoFocus } from './_directives/auto-focus.directive'
import { CartComponent } from './_components/cart/cart.component'
import { DropdownComponent } from './_components/custom/dropdown/dropdown.component'
import { StoreModule } from '@ngrx/store'
// import { NgAntModule } from './ngantmodule.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    ProfileComponent,
    AuthComponent,
    LoaderComponent,
    AutoFocus,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NgAntModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
