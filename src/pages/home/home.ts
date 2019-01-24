import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { atlas } from '../../models/atlas';
import { ChildrenPage } from '../children/children';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public objectList: Array<any>;
  public loadedObjectList: Array<any>;
  public objectRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public render: RenderProvider, public database: AccessFirebaseProvider) {
    // let objetos = mocks.profissionais;
    let objetos = atlas;
    this.objectList = objetos;
    this.loadedObjectList = objetos;
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
    this.objectList = this.objectList.filter((v) => {
      if (v.nome && valorSearch) {
        if (v.nome.toLowerCase().indexOf(valorSearch.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  openPage(object: any){
    this.navCtrl.push(ChildrenPage, {objeto: object});
  }
}
