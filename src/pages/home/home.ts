import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';
import { CacheProvider } from '../../providers/cache/cache';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _title = "Atendimento";
  private pages = [
    { name: 'Assistencia em Saúde', image: "../../assets/imgs/pets3.jpg", classe: "border border-primary", icon: 'heart' },
    { name: 'Prevenção e Treinamento', image: "../../assets/imgs/treino.jpg", classe: "border border-success ml-1", icon: 'medical' },
    { name: 'Beleza e Estética', image: "../../assets/imgs/treino.jpg", classe: "border border-success mt-1", icon: 'people' },
    { name: 'Pets', image: "../../assets/imgs/pets3.jpg", classe: "border border-primary ml-1 mt-1", icon: 'paw' },
  ];

  private buttons = {
    display: 'flex',
    height: window.screen.height * 0.38 + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }

  constructor(public navCtrl: NavController, private providerCache: CacheProvider, 
    public menuCtrl: MenuController) {
    this.buttons.height = window.screen.height * 0.4 + 'px';
    this.menuCtrl.enable(true);
  }

  goPage(nome) {
    this.providerCache.save("page", "AtendimentoPage");
    this.navCtrl.push(AtendimentoPage, { name: nome, title: this._title });
  }

}
