import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { SnapService } from './snap-service.service'

describe('SnapServiceo-', () => {
  let service: SnapService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    service = TestBed.inject(SnapService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
