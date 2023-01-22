import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import constants from 'src/app/_utils/constants'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any = []

  constructor(private snapservice: SnapService, private route: Router) {}

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    const body = {
      url: constants.products,
    }
    this.snapservice.httpGet(body).subscribe((result) => {
      // console.log(result);
      this.products = result
    })
  }

  gotoProduct = (product: any) => {
    this.route.navigate([`product/${product.name}/${product._id}`])
  }

  trackByItems(index: number, item: any): number {
    return item.id
  }
}
