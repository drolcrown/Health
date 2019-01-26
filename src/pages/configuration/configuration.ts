import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  private _imageViewerCtrl: ImageViewerController;

  constructor(public navCtrl: NavController, imageViewerCtrl: ImageViewerController, public navParams: NavParams) {
    this._imageViewerCtrl = imageViewerCtrl;
  }
  
  ionViewWillLoad() {
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
  
}
