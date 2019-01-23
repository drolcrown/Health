import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { HomePage } from '../pages/home/home';
import { ConfigurationAccountPage } from '../pages/configuration/configuration-account/configuration-account';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = LoginPage;
  // rootPage:any = ConfigurationAccountPage;
  rootPage:any = TabsPage;

  constructor(screenOrientation: ScreenOrientation, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.show();
      // splashScreen.hide();
    });
  }
}
