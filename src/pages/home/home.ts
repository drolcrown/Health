import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import { NavController, Searchbar, NavParams, Tabs, Keyboard } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';
import { atlas } from '../../models/atlas';
import { ChildrenRenderPage } from '../children-render/children-render';
import { CacheProvider } from '../../providers/cache/cache';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public objectList: Array<any>;
  public loadedObjectList: Array<any>;
  public listAll: Array<any> = [];
  public activeSearch = false;

  @ViewChild('search') searchbar: Searchbar;

  constructor(public navCtrl: NavController, public render: RenderProvider,
    public renderer: Renderer, public cache: CacheProvider, public tab: Tabs) {
    let objetos = atlas;
    this.listAll = this.recuperarItens(atlas).sort(function (a: any, b: any) {
      if (a.nome > b.nome) {
        return 1;
      }
      if (a.nome === b.nome) {
        return 0;
      }
      if (a.nome < b.nome) {
        return -1;
      }
    });
    this.objectList = objetos;
    this.loadedObjectList = objetos;
  }

  ordenarPorNome(a: any, b: any) {
    if (a.nome > b.nome) {
      return 1;
    }
    if (a.nome === b.nome) {
      return 0;
    }
    if (a.nome < b.nome) {
      return -1;
    }
  }

  toogleSearch() {
    this.searchbar.inputFocused();
    if (this.activeSearch) {
      this.initializeItems();
      this.tab.setTabbarHidden(false);
    }
    else {
      this.searchbar.value = "";
      this.tab.setTabbarHidden(true);
    }
    this.activeSearch = !this.activeSearch;
  }

  closeFocus() {
    this.searchbar.inputFocused();
    this.tab.setTabbarHidden(false);
    this.searchbar.value = "";
    this.initializeItems();
    this.activeSearch = false;
  }

  recuperarItens(lista) {
    lista.filter(el => {
      if (el.nome) {
        this.listAll.push(el);
      }
      if (el.filhos) {
        this.recuperarItens(el.filhos);
      }
    });
    return this.listAll;
  }

  expandItem(object, iconEnable, iconDesable, row) {
    if (object.expandWrapper.nativeElement.style.display === 'none') {
      this.renderer.setElementStyle(object.expandWrapper.nativeElement, 'display', 'block');
      iconEnable.style.display = 'none';
      iconDesable.style.display = 'block';
      iconDesable.style.color = 'rgb(216, 36, 130)';
      row.style.background = "white";
      row.style.color = "rgb(216, 36, 130)";
      row.style.border = "1px solid rgb(216, 36, 130)";
      row.style.fontSize = "15px";

    } else {
      this.renderer.setElementStyle(object.expandWrapper.nativeElement, 'display', 'none');
      iconDesable.style.display = 'none';
      iconEnable.style.display = 'Block';
      iconEnable.style.color = 'white';
      row.style.background = "rgb(216, 36, 130)";
      row.style.color = "white";
      row.style.fontSize = "15px";
    }
  }

  initializeItems(): void {
    this.objectList = this.loadedObjectList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var valorSearch = searchbar.srcElement.value;
    if (!valorSearch) {
      this.tab.setTabbarHidden(false);
      return;
    }
    this.objectList = this.listAll.filter((v) => {
      if (v.nome && valorSearch) {
        if (v.nome.toLowerCase().indexOf(valorSearch.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  openPage(object: any) {
    this.activeSearch = false;
    this.initializeItems();
    this.cache.saveList("dados", object.nome);
    this.navCtrl.push(ChildrenRenderPage, { objeto: object });
  }
}
