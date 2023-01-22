import { NgModule } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { en_US } from 'ng-zorro-antd/i18n'
import en from '@angular/common/locales/en'
import { registerLocaleData } from '@angular/common'

registerLocaleData(en)

@NgModule({
  exports: [NzButtonModule, NzCardModule, NzSkeletonModule, NzAvatarModule, NzFormModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class NgAntModule {}
