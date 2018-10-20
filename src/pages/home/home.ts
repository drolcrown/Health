import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pages =[
    {name: 'Assistencia em Saúde', icon: 'heart'},
    {name: 'Prevenção e Treinamento', icon: 'medical'},
    {name: 'Beleza e Estética', icon: 'people'},
    {name: 'Pets', icon: 'paw'},
  ];
  private buttons = {
    height: (window.screen.height * 0.1) + 'px'
  }

  constructor(public navCtrl: NavController) {
  }

  goPage(nome) {
    this.navCtrl.setRoot(AtendimentoPage, {name: nome})
  }

}
