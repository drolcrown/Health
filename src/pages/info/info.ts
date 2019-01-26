import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RenderProvider } from '../../providers/render/render';
import { CacheProvider } from '../../providers/cache/cache';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  private doughnutChart: any;
  private barChart: any;
  private labels = [];

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;

  constructor(public navCtrl: NavController, 
    public render: RenderProvider, public cache: CacheProvider) {
  }
  
  ionViewDidEnter(){
    this.generateGraph();
  }

  generateGraph() {
    let listaChave = [];
    let listaValor = [];
    let listaBackgroundColor = [];
    let listaHoverBackgroundColor = [];
    this.cache.get("dados").then(resp => {
      if (resp) {
        resp.filter(el => {
          if (listaChave.indexOf(el.toLowerCase()) > -1) {
            listaValor[listaChave.indexOf(el.toLowerCase())]++;
          } else {
            listaChave.push(el.toLowerCase());
            listaBackgroundColor.push(this.render.getColor(listaChave.length, 0.5));
            listaHoverBackgroundColor.push(this.render.getColor(listaChave.length, 1));
            this.labels.push({label: el.toLowerCase(), color: this.render.getColor(listaChave.length, 1)});
            listaValor.push(1);
          }

          this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
              labels: listaChave,
              datasets: [{
                data: listaValor,
                backgroundColor: listaBackgroundColor,
                hoverBackgroundColor: listaHoverBackgroundColor,
              }]
            },
            options: {
              // layout: {
              //   padding: {
              //     left: 0,
              //     right: 150,
              //     top: 0,
              //     bottom: 0
              //   }
              // },
              animation: {
                duration: 3000
              },
              legend: {
                display: false,
                labels: {
                  // fontColor: 'rgb(255, 99, 132)',
                  // fontSize    : 15,
                }
              },
            }
          });
        });
      }
    });
  }
}