import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, Footer } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private footerOn = false;
  private objectList: Array<any>;
  private loadedObjectList: Array<any>;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public providerCache: CacheProvider) {
  }

  ionViewDidEnter() {
    // this.providerCache.get('profissional').then(resp => {
    //   if (!resp) {
    this.provider.getAll('profissional')
      .subscribe(value => {
        this.loadedObjectList = value;
        this.objectList = value;
      });
    // }
    // });
  }

  initializeItems(): void {
    this.objectList = this.loadedObjectList;
  }

  public getItems(searchbar) {
    this.initializeItems();
    var valorSearch = searchbar.srcElement.value;
    if (!valorSearch) {
      this.footerOn = false;
      return;
    } else {
      this.footerOn = true;
      this.objectList = this.objectList.filter((v) => {
        if (v.nome && valorSearch) {
          if (v.nome.toLowerCase().indexOf(valorSearch.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    }
  }

  public receiverFeedback(scroll) {
    // this.footerOn = scroll;
  }
}
