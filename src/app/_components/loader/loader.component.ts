import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { LoaderService } from './loader.service'

@Component({
  selector: 'app-loader',
  template: '<div  *ngIf="isLoading | async" class="loader-wrapper"><div class="loading"></div></div>',
  styles: [
    `
      @-webkit-keyframes rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      .loader-wrapper {
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: 9999;
        background-color: #ffffff91;
      }
      .loader-wrapper .loading {
        height: 0;
        width: 0;
        padding: 15px;
        border: 6px solid #ccc;
        border-right-color: #2874f0;
        border-radius: 22px;
        -webkit-animation: rotate 1s infinite linear;
        animation: rotate 1s infinite linear;
        /* left, top and position just for the demo! */
        position: absolute;
        left: 50%;
        top: 50%;
      }
    `,
  ],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading
  constructor(private loaderService: LoaderService) {}
}
