import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UFs } from '../../models/uf';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ModalFiltrosComponent } from '../../components/modal-filtros/modal-filtros';
import { anuncios } from '../../models/anuncios';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigastion.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  private form: FormGroup;
  private _tipos = ["Apartamento", "Casa", "República"];
  private _sexo = ["Feminino", "Masculino"];
  private _estados = UFs;
  private muniON = false;
  private _municipios = [];
  private imgs = [];
  private user;
  private page;
  private imgCirc;
  private _imageViewerCtrl;
  private anuncio = anuncios;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public modalCtrl: ModalController, public navParams: NavParams,
    public builder: FormBuilder, public cache: CacheProvider,
    imageViewerCtrl: ImageViewerController) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.imgCirc = {
      height: window.screen.height * 0.13 + 'px',
      width: window.screen.width + 'px',
      borderRadius: "50%"
    };
    this.user = navParams.get("usuario");
    this.page = navParams.get("page");

    this.anuncio.usuario = this.user.id;
    this.form = builder.group(this.anuncio);
  }

  private presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  public getMunicipio(value) {
    if (value) {
      this._estados.filter(el => {
        if (el.nome == value) {
          this._municipios = el.municipios;
          this.muniON = true;
          return;
        }
      });
    } else {
      this.muniON = false;
    }
  }

  private salvarArquivo(arq) {
    let arquivos = arq.target.files;
    for (let i = 0; i < arquivos.length; i++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgs.push(e.target.result);
      };
      reader.readAsDataURL(arquivos[i]);
    }
  }

  private openModalFilter() {
    let modal = this.modalCtrl.create(ModalFiltrosComponent, { filtros: this.form.controls.filtros.value })
    modal.present();

    modal.onDidDismiss(data => {
      let control = new FormControl(data);
      this.form.setControl('filtros', control);
    });
  }

  public addAdverts() {
    let anuncio = this.form.value;
    anuncio.imagens = [];
    this.provider.savePicturesAdverts(anuncio, this.user, this.imgs).subscribe((anun) => {
      this.provider.save("anuncio", anun).subscribe(() => {
        this.cache.save('usuario-anuncios', true);
        this.navCtrl.setRoot(this.page, { atualizarAnuncios: true });
      });
    });
  }
}
