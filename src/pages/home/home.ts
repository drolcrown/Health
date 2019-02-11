import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AtendimentoPage } from '../atendimento/atendimento';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _title = "Atendimento";
  private profissionais = [];
  private pages = [
    { name: 'Assistencia em Saúde', image: "../../assets/imgs/pets3.jpg", classe: "border border-primary", icon: 'heart' },
    { name: 'Prevenção e Treinamento', image: "../../assets/imgs/treino.jpg", classe: "border border-success ml-1", icon: 'medical' },
    { name: 'Beleza e Estética', image: "../../assets/imgs/treino.jpg", classe: "border border-success mt-1", icon: 'people' },
    { name: 'Pets', image: "../../assets/imgs/pets3.jpg", classe: "border border-primary ml-1 mt-1", icon: 'paw' },
  ];

  private buttons = {
    display: 'flex',
    height: window.screen.height * 0.35 + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }

  constructor(public navCtrl: NavController, private providerCache: CacheProvider,
    public menuCtrl: MenuController, public provider: AccessFirebaseProvider) {
    this.buttons.height = window.screen.height * 0.35 + 'px';
    this.menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    this.providerCache.get('profissional').then(resp => {
      if (!resp) {
        this.provider.getAll('profissional')
          .subscribe(value => {
            this.profissionais = value;
          });
      }
    });
  }

  goPage(nome) {
    switch (nome) {
      case 'Assistencia em Saúde':
        nome = 'assistencia';
        break;
      case 'Prevenção e Treinamento':
        nome = 'prevencao';
        break;
      case 'Beleza e Estética':
        nome = 'estetica';
        break;
      case 'Pets':
        nome = 'pets';
        break;
    }
    this.providerCache.save("page", "AtendimentoPage");
    this.providerCache.updateCache('especialidades/' + nome).then(resp => {
      if (!resp) {
        this.provider.getAll('especialidades/' + nome).subscribe(espec => {
          if (espec) {
            this.navCtrl.push(AtendimentoPage, { name: nome, title: this._title, especialidades: espec });
          }
        });
      } else {
        this.navCtrl.push(AtendimentoPage, { name: nome, title: this._title, especialidades: resp });
      }
    });
  }

}
