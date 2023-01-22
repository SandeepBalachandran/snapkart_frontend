import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { SnapService } from 'src/app/_services/snap-service/snap-service.service'
import { Location } from '@angular/common'

import { ProductListComponent } from './product-list.component'

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>
  let data: any[]
  let snapService: SnapService
  let location: Location
  let router: Router
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ProductListComponent],
      providers: [
        SnapService,
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
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

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get all the products on pageload', () => {
    spyOn(snapService, 'httpGet').and.returnValue(of(data))
    component.getProducts()
    expect(component.products).toBe(data)
  })

  xit('navigate to "productlist" takes you to /product/name', fakeAsync(() => {
    // router.navigate(['product'])
    // tick()
    // expect(location.path()).toBe('/product')
    const spy = router.navigateByUrl as jasmine.Spy

    const navArgs = spy.calls.first().args[0]
    const name = 'Producct Name'
    const id = '993933033'
    expect(navArgs)
      .withContext('should nav to ViewDetailComponent for book detail')
      .toBe('/product/' + name + id)
  }))
})
