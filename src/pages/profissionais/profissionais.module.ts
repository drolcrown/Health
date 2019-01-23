import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfissionaisPage } from './profissionais';

@NgModule({
  declarations: [
    ProfissionaisPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfissionaisPage),
  ],
})
export class ProfissionaisPageModule {}
