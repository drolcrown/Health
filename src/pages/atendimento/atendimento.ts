import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { SituacaoClinica } from '../../Models/situacaoClinica';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  private name: string;
  private search = false;
  private select = '';
  private sit = SituacaoClinica;
  private options: any;
  private profissionais;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider) {
    this.name = navParams.get('name');
    this.popularSituacoes();
    // this.provider.getAll('profissional').subscribe(resp => {
    //   this.profissionais = resp;
    // });
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
        // this.options = this.sit.pets;
        this.provider.getAll('profissional').subscribe(resp => {
          this.options = resp;
        });
        break;
    }
  }

}
