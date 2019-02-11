import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  private name: string;
  private title: string;
  private search = false;
  private objectList: Array<any>;
  private loadedObjectList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public providerCache: CacheProvider) {
    this.name = navParams.get('name');
    this.title = navParams.get('title');
  }

  ionViewDidEnter(){
    this.objectList = this.navParams.get('especialidades');
    this.loadedObjectList = this.objectList 
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
