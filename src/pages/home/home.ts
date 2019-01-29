import { Component, Renderer, ViewChild, ContentChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';
import { atlas } from '../../models/atlas';
import { ChildrenPage } from '../children/children';
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

  // @ViewChild("expand") expand;
  // @ViewChild("iconEnable") iconEnable;
  // @ViewChild("iconDesable") iconDesable;

  constructor(public navCtrl: NavController, public render: RenderProvider,
    public renderer: Renderer, public cache: CacheProvider) {
    let objetos = atlas;
    this.listAll = this.recuperarItens(atlas);
    this.objectList = objetos;
    this.loadedObjectList = objetos;
  }

  ionViewDidEnter() {
    // this.renderer.setElementStyle(this.expand.expandWrapper.nativeElement, 'display', 'none');
    // this.renderer.setElementStyle(this.iconDesable.nativeElement, 'display', 'none');
    // this.renderer.setElementStyle(this.iconEnable.nativeElement, 'display', 'Block');
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
      iconDesable.style.color= 'rgb(216, 36, 130)';
      row.style.background = "white";
      row.style.color = "rgb(216, 36, 130)";
      row.style.border = "1px solid rgb(216, 36, 130)";
      row.style.fontSize = "15px";

    } else {
      this.renderer.setElementStyle(object.expandWrapper.nativeElement, 'display', 'none');
      iconDesable.style.display = 'none';
      iconEnable.style.display = 'Block';
      iconEnable.style.color= 'white';
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
    this.cache.saveList("dados", object.nome);
    this.navCtrl.push(ChildrenRenderPage, { objeto: object });
  }
}
