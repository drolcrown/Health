import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusAnunciosPage } from './meus-anuncios';

@NgModule({
  declarations: [
    MeusAnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusAnunciosPage),
  ],
})
export class MeusAnunciosPageModule {}
