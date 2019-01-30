import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pages = [
    { name: 'Assistencia em Saúde', icon: 'heart' },
    { name: 'Prevenção e Treinamento', icon: 'medical' },
    { name: 'Beleza e Estética', icon: 'people' },
    { name: 'Pets', icon: 'paw' },
  ];
  private item = {
    height: (window.screen.height * 0.15) + 'px',
    width: (window.screen.width * 1) + 'px'
  }

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {
  this.menuCtrl.enable(true);
}

goPage(nome) {
  this.navCtrl.setRoot(AtendimentoPage, { name: nome })
}

}
