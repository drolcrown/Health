import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';
import { CacheProvider } from '../../providers/cache/cache';

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
    height: window.screen.height * 0.40 + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }

  constructor(public navCtrl: NavController, private menuCtrl: MenuController,
    private providerCache: CacheProvider) {
      this.menuCtrl.enable(false);
      this.buttons.height = window.screen.height * 0.38 + 'px';
  }

  goPage(nome) {
    // this.navCtrl.push(ListComponent, { name: nome });
    this.providerCache.save("page", "AtendimentoPage");
    this.navCtrl.push(AtendimentoPage, { name: nome });
  }

}
