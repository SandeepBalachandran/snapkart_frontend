import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import constants from 'src/app/_utils/constants'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: any
  selectedId: number | undefined
  productId: any

  constructor(private activatedRoute: ActivatedRoute, private snapService: SnapService, private route: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((ele: any) => {
      const id = ele.params.id
      const name = ele.params.name
      this.productId = id
      // console.log(id, name)
      this.getProduct(id)
    })

    // this.magnify('product', 2)
  }

  getProduct = (id: any) => {
    const body = {
      url: `${constants.product}/${id}`,
    }
    this.snapService.httpGet(body).subscribe((ele) => {
      // console.log(ele)
      this.product = ele
    })
  }

  magnify(imgID: string, zoom: number) {
    var img: any | null, glass: any, w: number, h: number, bw: number
    img = document.getElementById(imgID)
    /*create magnifier glass:*/
    glass = document.createElement('DIV')
    glass.setAttribute('class', 'img-magnifier-glass')
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img)
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')"
    glass.style.backgroundRepeat = 'no-repeat'
    glass.style.backgroundSize = img.width * zoom + 'px ' + img.height * zoom + 'px'
    bw = 3
    w = glass.offsetWidth / 2
    h = glass.offsetHeight / 2
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener('mousemove', moveMagnifier)
    img.addEventListener('mousemove', moveMagnifier)
    /*and also for touch screens:*/
    glass.addEventListener('touchmove', moveMagnifier)
    img.addEventListener('touchmove', moveMagnifier)
    function moveMagnifier(e: any) {
      var pos, x, y
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault()
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e)
      x = pos.x
      y = pos.y
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom
      }
      if (x < w / zoom) {
        x = w / zoom
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom
      }
      if (y < h / zoom) {
        y = h / zoom
      }
      /*set the position of the magnifier glass:*/
      glass.style.left = x - w + 'px'
      glass.style.top = y - h + 'px'
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition = '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px'
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0
      e = e || window.event
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect()
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left
      y = e.pageY - a.top
      /*consider any page scrolling:*/
      x = x - window.pageXOffset
      y = y - window.pageYOffset
      return { x: x, y: y }
    }
  }

  addToCart = () => {
    const user = this.authService.get('user')
    const params = {
      url: `${constants.cart}`,
      body: { user, productid: this.productId },
    }
    this.snapService.httpPost(params).subscribe((ele) => {
      console.log(ele)
      // this.product = ele
      this.route.navigate(['/cart'])
    })
    this.route.navigate(['/cart'])
  }
}
