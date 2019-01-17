import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pages = [
    { name: 'Assistencia em Saúde', image: "../../assets/imgs/pets3.jpg", icon: 'heart' },
    { name: 'Prevenção e Treinamento', image: "../../assets/imgs/treino.jpg", icon: 'medical' },
    { name: 'Beleza e Estética', image: "../../assets/imgs/treino.jpg", icon: 'people' },
    { name: 'Pets', image: "../../assets/imgs/pets3.jpg", icon: 'paw' },
  ];
  private buttons = {
    display: 'flex',
    height:  window.screen.height * 0.40 + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.buttons.height = window.screen.height * 0.38 + 'px';
  }

  goPage(nome) {
    this.navCtrl.setRoot(AtendimentoPage, { name: nome });
    // this.navCtrl.push(AtendimentoPage);
  }

}
