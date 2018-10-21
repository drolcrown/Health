import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { SituacaoClinica } from '../../Models/situacaoClinica';
import { AlertsProvider } from '../../providers/alerts/alerts';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  private name: string;
  private select = '';
  private sit = new SituacaoClinica();
  private options = [];
  private profissionais;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider) {
    this.name = navParams.get('name');
    this.popularSituacoes();
    this.profissionais = this.provider.getAll('profissional/');
  }

  ionViewDidLoad() {
  }

  public popularSituacoes() {
    switch (this.name) {
      case 'Assistencia em Saúde':
        this.options = this.sit.assistencia;
        break;
      case 'Prevenção e Treinamento':
        this.options = this.sit.prevencao;
        break;
      case 'Beleza e Estética':
        this.options = this.sit.estetica;
        break;
      case 'Pets':
        this.options = this.sit.pets;
        break;
    }
  }

}
