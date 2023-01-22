import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import constants from 'src/app/_utils/constants'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private authService: AuthService, private snapService: SnapService) {}
  cartItems: any[] = []

  ngOnInit(): void {
    this.getCartItems()
  }
  getCartItems = () => {
    const user = this.authService.get('user')

    const body = {
      url: `${constants.cart}/${user}`,
    }
    this.snapService.httpGet(body).subscribe((ele: any) => {
      // console.log(ele)
      this.cartItems = ele
    })

    this.cartItems = [
      {
        name: 'realme 9i (Prism Blue, 128 GB)  (4 GB RAM)',
        price: 13400,
        rating: 3.5,
      },
      {
        name: 'realme 9i (Prism Blue, 128 GB)  (4 GB RAM)',
        price: 13400,
        rating: 3.5,
      },
      {
        name: 'realme 9i (Prism Blue, 128 GB)  (4 GB RAM)',
        price: 13400,
        rating: 3.5,
      },
    ]
  }
  trackByItems(index: number, item: any): number {
    return item.id
  }

  increaseItemCount = () => {}
  decreaseItemCount = () => {}
  placeOrder = () => {}
}
