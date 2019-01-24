import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildrenRenderPage } from './children-render';

@NgModule({
  declarations: [
    ChildrenRenderPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenRenderPage),
  ],
})
export class ChildrenRenderPageModule {}
