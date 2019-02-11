import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPessoaisPage } from './modal-pessoais';

@NgModule({
  declarations: [
    ModalPessoaisPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPessoaisPage),
  ],
})
export class ModalPessoaisPageModule {}
