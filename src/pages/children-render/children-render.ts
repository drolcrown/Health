import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';
import { ImageViewerController } from 'ionic-img-viewer';
import { CacheProvider } from '../../providers/cache/cache';

/**
 * Generated class for the ChildrenRenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-render',
  templateUrl: 'children-render.html',
})
export class ChildrenRenderPage {
  private _imageViewerCtrl: ImageViewerController;
  private objeto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cache: CacheProvider,
     public render: RenderProvider, imageViewerCtrl: ImageViewerController) {
    this.objeto = this.navParams.get("objeto");
    this._imageViewerCtrl = imageViewerCtrl;
  }
 
  ionViewDidLoad() {
  }
  
  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  openPage(object: any){
    this.cache.saveList("dados", object.nome);
    this.navCtrl.push(ChildrenRenderPage, {objeto: object});
  }


}
