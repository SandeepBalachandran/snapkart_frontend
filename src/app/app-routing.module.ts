import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './_components/auth/auth.component'
import { CartComponent } from './_components/cart/cart.component'
import { ProductListComponent } from './_components/product-list/product-list.component'
import { ProductComponent } from './_components/product/product.component'
import { AuthGuard } from './_guards/auth.guard'

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'product/:name/:id',
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // redirect to `first-component`
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
