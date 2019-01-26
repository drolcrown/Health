import { Component, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';
import { atlas } from '../../models/atlas';
import { ChildrenPage } from '../children/children';
import { ChildrenRenderPage } from '../children-render/children-render';
import { CacheProvider } from '../../providers/cache/cache';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public objectList: Array<any>;
  public loadedObjectList: Array<any>;
  public listAll: Array<any> = [];

  constructor(public navCtrl: NavController, public render: RenderProvider,
    public renderer: Renderer, public cache: CacheProvider) {
    let objetos = atlas;
    this.listAll = this.recuperarItens(atlas);
    this.objectList = objetos;
    this.loadedObjectList = objetos;
  }

  recuperarItens(lista) {
    lista.filter(el => {
      if (el.nome) {
        this.listAll.push(el);
      }
      if (el.filhos) {
        this.recuperarItens(el.filhos);
      } else {
        return;
      }
    });
    return this.listAll;
  }

  expandItem(object, iconEnable, iconDesable) {
    if (object.expandWrapper.nativeElement.style.display === 'none') {
      this.renderer.setElementStyle(object.expandWrapper.nativeElement, 'display', 'block');
      iconDesable.style.display = 'block';
      iconEnable.style.display = 'none';
    }else{
      this.renderer.setElementStyle(object.expandWrapper.nativeElement, 'display', 'none');
      iconDesable.style.display = 'none';
      iconEnable.style.display = 'block';
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
