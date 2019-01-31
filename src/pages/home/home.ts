import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Platform, Nav, NavParams } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';
import { CacheProvider } from '../../providers/cache/cache';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private nav;
  private perfil: Array<any>;

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

  constructor(private menuCtrl: MenuController, private navParams: NavParams,
    private providerCache: CacheProvider, private platform: Platform) {
      this.nav = this.navParams.data;
      console.log(this.nav)
      this.menuCtrl.enable(false);
    this.buttons.height = window.screen.height * 0.38 + 'px';
  }

  ionViewDidEnter() {
  }


  goPage(nome) {
    // this.navCtrl.push(ListComponent, { name: nome });
    this.providerCache.save("page", "AtendimentoPage");
    this.nav.push(AtendimentoPage, { name: nome });
  }

}
