import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RenderProvider } from '../../providers/render/render';
import { CacheProvider } from '../../providers/cache/cache';

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
  private estat = false;
  private labels = [];
  private dateUpdate = new Date().toLocaleString().substring(0, 10);

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;

  constructor(public navCtrl: NavController,
    public render: RenderProvider, public cache: CacheProvider) {
  }

  ionViewDidEnter() {
    this.labels = [];
    this.estat = false;
    this.updateGraph();
    this.generateGraph();
  }

  updateGraph() {
    let date = new Date();
    this.cache.get("updateChart").then(resp => {
      if (resp && resp.toLocaleString().substring(0, 10) !== date.toLocaleString().substring(0, 10)) {
        if (date.getDate() === 7 || date.getDate() === 14 || date.getDate() === 21 || date.getDate() === 28) {
          this.cache.clear();
          this.cache.save("updateChart", date.toLocaleString().substring(0, 10));
        }
        this.dateUpdate = resp;
      }
    });
  }

  generateGraph() {
    let listaChave = [];
    let listaBackgroundColor = [];
    let listaHoverBackgroundColor = [];
    let listaValor = [];
    this.cache.get("dados").then(resp => {
      if (!resp){
        this.estat = true;
      }else{
        resp.filter(el => {
          if (listaChave.indexOf(el.toLowerCase()) > -1) {
            listaValor[listaChave.indexOf(el.toLowerCase())]++;
          } else {
            listaBackgroundColor.push(this.render.getColor(listaChave.length, 0.5));
            listaHoverBackgroundColor.push(this.render.getColor(listaChave.length, 1));
            listaChave.push(el.toLowerCase());
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
              animation: {
                duration: 3000
              },
              legend: {
                display: false,
              },
            }
          });
        });
      }
      listaChave.forEach((el, index) => {
        this.labels.push({
          label: el.toLowerCase(),
          color: this.render.getColor(index, 1),
          size: listaValor[index]
        });
      });
    });
  }
}