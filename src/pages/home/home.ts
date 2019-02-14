import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Footer, Searchbar } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ap } from '../../models/ap';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private footerOn = false;
  private scrollY = 0;
  private objectList: Array<any>;
  private loadedObjectList: Array<any>;
  public activeSearch = false;
  public usuario;

  @ViewChild('search') searchbar: Searchbar;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public providerCache: CacheProvider, public menuCtrl: MenuController) {
    menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    this.providerCache.updateCache('anuncio').subscribe(resp => {
      this.loadedObjectList = resp;
      this.objectList = resp;
    });
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
    if(scroll){
      this.footerOn = true;
    }

    // if(scroll.scrollTop + 30 < this.scrollY  || scroll.scrollTop > this.scrollY + 30 ){
    //   console.log('entrei')
    // }else{
    //   console.log('entrei cc')
    //   this.scrollY = scroll.scrollTop;

    // }
  }

  public openModal(){
    this.providerCache.get('usuario').then(resp => {
      this.navCtrl.push(ModalPage, {usuario: resp});
    });
  }
}
