import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Footer, Searchbar, ModalController } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ap } from '../../models/ap';
import { ModalPage } from '../modal/modal';
import { ModalFiltrosComponent } from '../../components/modal-filtros/modal-filtros';
import { anuncios } from '../../models/anuncios';

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
  private filtros = anuncios.filtros;
  public usuario;

  @ViewChild('search') searchbar: Searchbar;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider, public params: NavParams,
    public providerCache: CacheProvider, public menuCtrl: MenuController, public modalCtrl: ModalController) {
    menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    if(this.params.get('atualizarAnuncios')){
      this.providerCache.remove('anuncio');
    }
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
    if (scroll) {
      this.footerOn = true;
    }

    // if(scroll.scrollTop + 30 < this.scrollY  || scroll.scrollTop > this.scrollY + 30 ){
    //   console.log('entrei')
    // }else{
    //   console.log('entrei cc')
    //   this.scrollY = scroll.scrollTop;

    // }
  }

  public openModal() {
    this.providerCache.get('usuario').then(resp => {
      this.navCtrl.push(ModalPage, { usuario: resp });
    });
  }

  private openModalFilter() {
    let modal = this.modalCtrl.create(ModalFiltrosComponent, { filtros: this.filtros })
    modal.present();

    modal.onDidDismiss(data => {
      this.filtros = data;
      let padrao = "Sem Resposta";
      let listaFiltros = [data.idade, data.sexo, data.criancas, data.animais];
      this.initializeItems();
      if (data.idade === padrao && data.sexo === padrao && data.criancas === padrao && data.animais === padrao) {
        return;
      }
      this.objectList = this.objectList.filter((el) => {
        if (el.filtros) {
          if ((data.idade === padrao || el.filtros.idade.indexOf(data.idade) > -1) &&
            (data.sexo === padrao || el.filtros.sexo.indexOf(data.sexo) > -1) &&
            (data.criancas === padrao || el.filtros.criancas.indexOf(data.criancas) > -1) &&
            (data.animais === padrao || el.filtros.animais.indexOf(data.animais)) > -1) {
            return true;
          }
          return false;
        }
      });
    });
  }
}
