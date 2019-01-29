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

  public getColor(valor: number, contrast: number) {
    let colors = [
      'rgba(255, 99, 132, ' + contrast + ')',
      'rgba(54, 162, 235, ' + contrast + ')',
      'rgba(255, 206, 86, ' + contrast + ')',
      'rgba(153, 102, 255, ' + contrast + ')',
      'rgba(255, 0, 0, ' + contrast + ')',
      'rgba(102, 153, 153, ' + contrast + ')',
      'rgba(204, 0, 153, ' + contrast + ')',
      'rgba(153, 255, 51,' + contrast + ')',
      'rgba(170, 159, 64, ' + contrast + ')',
      'rgba(0, 255,	31,' + contrast + ')',
      'rgba(220, 20,	60	,' + contrast + ')',
      'rgba(0, 255,	191,' + contrast + ')',
      'rgba(0, 25,	221,' + contrast + ')',
      'rgba(222, 2,	3	,' + contrast + ')',
      'rgba(205, 40,	214	,' + contrast + ')',
      'rgba(139, 95,	101	,' + contrast + ')',
      'rgba(255, 181,	97	,' + contrast + ')',
      'rgba(205, 14,	158	,' + contrast + ')',
      'rgba(189, 99,	108	,' + contrast + ')',
      'rgba(119, 112,	147	,' + contrast + ')',
      'rgba(255, 130,	171	,' + contrast + ')',
      'rgba(28, 121,	159	,' + contrast + ')',
      'rgba(205, 104,	137	,' + contrast + ')',
      'rgba(139, 71,	93	,' + contrast + ')',
      'rgba(255, 240,	245	,' + contrast + ')',
      'rgba(205, 193,	197	,' + contrast + ')',
      'rgba(139, 131,	134	,' + contrast + ')',
      'rgba(255, 62,	150	,' + contrast + ')',
      'rgba(238, 58,	140	,' + contrast + ')',
      'rgba(205, 50,	120	,' + contrast + ')',
      'rgba(139, 34,	82	,' + contrast + ')',
      'rgba(255, 110,	180	,' + contrast + ')',
      'rgba(238, 106,	167	,' + contrast + ')',
      'rgba(205, 96,	144	,' + contrast + ')',
      'rgba(139, 58,	98	,' + contrast + ')',
      'rgba(135, 38,	87	,' + contrast + ')',
      'rgba(255, 20,	147	,' + contrast + ')',
      'rgba(238, 18,	137	,' + contrast + ')',
      'rgba(205, 16,	118	,' + contrast + ')',
      'rgba(139, 10,	80	,' + contrast + ')',
      'rgba(255, 52,	179	,' + contrast + ')',
      'rgba(238, 48,	167	,' + contrast + ')',
      'rgba(205, 41,	144	,' + contrast + ')',
      'rgba(199, 21,  133	,' + contrast + ')',
      'rgba(208, 32, 144	,' + contrast + ')',
      'rgba(218, 112,	214	,' + contrast + ')',
      'rgba(255, 131,	250	,' + contrast + ')',
      'rgba(238, 122,	233	,' + contrast + ')',
      'rgba(205, 105,	201	,' + contrast + ')',
      'rgba(139, 71,	137	,' + contrast + ')',
      'rgba(216, 191, 216,' + contrast + ')',
      'rgba(255, 225, 255,' + contrast + ')',
      'rgba(238, 210, 238,' + contrast + ')',
      'rgba(205, 181, 205,' + contrast + ')',
      'rgba(139, 123, 139,' + contrast + ')',
      'rgba(255, 187, 255,' + contrast + ')',
      'rgba(238, 174, 238,' + contrast + ')',
      'rgba(205, 150, 205,' + contrast + ')',
      'rgba(139, 102, 139,' + contrast + ')',
      'rgba(221, 160, 221,' + contrast + ')',
      'rgba(238, 130, 238,' + contrast + ')',
      'rgba(255, 0, 255,' + contrast + ')',
      'rgba(238, 0, 238,' + contrast + ')',
      'rgba(205, 0, 205,' + contrast + ')',
      'rgba(139, 0, 139,' + contrast + ')',
      'rgba(128, 0, 128,' + contrast + ')',
      'rgba(186, 85, 211,' + contrast + ')',
      'rgba(224, 102, 255,' + contrast + ')',
      'rgba(209, 95, 238,' + contrast + ')',
      'rgba(180, 82, 205,' + contrast + ')',
      'rgba(122, 55, 139,' + contrast + ')',
      'rgba(148, 0, 211,' + contrast + ')',
      'rgba(153, 50, 204,' + contrast + ')',
      'rgba(191, 62, 255,' + contrast + ')',
      'rgba(178, 58, 238,' + contrast + ')',
      'rgba(154, 50, 205,' + contrast + ')',
      'rgba(104, 34, 139,' + contrast + ')',
      'rgba(75,  0, 130,' + contrast + ')',
      'rgba(138, 43, 226,' + contrast + ')',
      'rgba(155, 48, 255,' + contrast + ')',
      'rgba(145, 44, 238,' + contrast + ')',
      'rgba(125, 38, 205,' + contrast + ')',
      'rgba(85, 26, 139,' + contrast + ')',
      'rgba(147, 112, 219,' + contrast + ')',
      'rgba(171, 130, 255	,' + contrast + ')',
      'rgba(159, 121, 238	,' + contrast + ')',
      'rgba(137, 104, 205	,' + contrast + ')',
      'rgba(93, 71, 139	,' + contrast + ')',
      'rgba(72, 61, 139	,' + contrast + ')',
      'rgba(132, 112, 255	,' + contrast + ')',
      'rgba(123, 104, 238	,' + contrast + ')',
      'rgba(106, 90, 205,' + contrast + ')',
      'rgba(131, 111, 255,' + contrast + ')',
      'rgba(122, 103, 238,' + contrast + ')',
      'rgba(105, 89, 205,' + contrast + ')',
      'rgba(71, 60, 139	,' + contrast + ')',
      'rgba(248, 248, 255	,' + contrast + ')',
      'rgba(230, 230, 250	,' + contrast + ')',
      'rgba(0, 0, 255,' + contrast + ')',
      'rgba(0, 0, 238,' + contrast + ')',
      'rgba(0, 0, 205,' + contrast + ')',
      'rgba(0, 0, 139,' + contrast + ')',
      'rgba(0, 0, 128,' + contrast + ')',
      'rgba(25, 25, 112,' + contrast + ')',
      'rgba(61, 89, 171,' + contrast + ')',
      'rgba(65, 105, 225,' + contrast + ')'
    ];

    return colors[valor]
  }
}

