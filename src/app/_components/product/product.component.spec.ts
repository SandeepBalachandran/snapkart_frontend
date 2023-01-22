import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { AuthService } from 'src/app/store/auth.service'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'

import { ProductComponent } from './product.component'

describe('ProductComponent', () => {
  let component: ProductComponent
  let fixture: ComponentFixture<ProductComponent>
  let data: any[]
  let snapService: SnapService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ProductComponent],
      providers: [SnapService, AuthService],
    }).compileComponents()

    snapService = TestBed.inject(SnapService)
    data = [
      {
        _id: '632a8a33d96a2d87646705a4',
        name: 'realme 6 (Comet White, 64 GB)  (6 GB RAM)',
        rating: 4.5,
        price: 13400,
        createdAt: '2022-09-21T03:51:15.697Z',
        updatedAt: '2022-09-21T03:51:15.697Z',
        __v: 0,
      },
    ]

    fixture = TestBed.createComponent(ProductComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get details of a single product', () => {
    spyOn(snapService, 'httpGet').and.returnValue(of(data))
    component.getProduct('123')
    expect(component.product).toBe(data)
  })
})
