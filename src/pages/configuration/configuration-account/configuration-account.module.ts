import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationAccountPage } from './configuration-account';

@NgModule({
  declarations: [
    ConfigurationAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationAccountPage),
  ],
})
export class ConfigurationAccountPageModule {}
