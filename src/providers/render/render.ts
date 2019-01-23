import { Injectable } from '@angular/core';

/*
  Generated class for the RenderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RenderProvider {
  public heightMobile: any;
  public widthMobile: any;

  constructor() {
    this.heightMobile = window.screen.height;
    this.widthMobile = window.screen.width;
  }


  public getMedidas(percentHeight: any, percentWidth: any): any {
    return {
      height: this.heightMobile * percentHeight + 'px',
      width: this.widthMobile * percentWidth + 'px'
    }
  }

}
