import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Footer, Searchbar } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ap } from '../../models/ap';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private footerOn = false;
  private objectList: Array<any>;
  private loadedObjectList: Array<any>;
  public activeSearch = false;

  @ViewChild('search') searchbar: Searchbar;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public providerCache: CacheProvider) { }

  ionViewDidEnter() {
    this.loadedObjectList = ap;
    this.objectList = ap;

    // this.providerCache.get('profissional').then(resp => {
    //   if (!resp) {
    // this.provider.getAll('profissional')
    //   .subscribe(value => {
    //     this.loadedObjectList = value;
    //     this.objectList = value;
    //   });
    // }
    // });
  }

  toogleSearch() {
    this.searchbar.inputFocused();
    if (this.activeSearch) {
      this.initializeItems();
    }
    else {
      this.searchbar.value = "";
    }
    this.activeSearch = !this.activeSearch;
  }

  closeFocus() {
    this.searchbar.inputFocused();
    this.searchbar.value = "";
    this.initializeItems();
    this.activeSearch = false;
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
