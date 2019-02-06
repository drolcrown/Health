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
  private title: string;
  private search = false;
  private sit = SituacaoClinica;
  private objectList: Array<any>;
  private loadedObjectList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider) {
    this.name = navParams.get('name');
    this.title = navParams.get('title');
    this.popularSituacoes();
  }

  public popularSituacoes() {
    switch (this.name) {
      case 'Assistencia em Saúde':
        this.objectList = this.sit.assistencia;
        this.loadedObjectList = this.sit.assistencia;
        break;
      case 'Prevenção e Treinamento':
        this.objectList = this.sit.prevencao;
        this.loadedObjectList = this.sit.prevencao;
        break;
      case 'Beleza e Estética':
        this.objectList = this.sit.estetica;
        this.loadedObjectList = this.sit.estetica;
        break;
      case 'Pets':
        this.provider.getAll('profissional').subscribe(resp => {
          this.objectList = resp;
          this.loadedObjectList = resp;
        });
        break;
    }
  }

  initializeItems(): void {
    this.objectList = this.loadedObjectList;
  }

  public getItems(searchbar) {
    this.initializeItems();
    var valorSearch = searchbar.srcElement.value;
    if (!valorSearch) {
      return;
    }
    this.objectList = this.objectList.filter((v) => {
      if (v.nome && valorSearch) {
        if (v.nome.toLowerCase().indexOf(valorSearch.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  public goSearch() {
    this.search = !this.search;
  }

}
