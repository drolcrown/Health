import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(screenOrientation: ScreenOrientation, platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#E75FA0");
      // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.show();
      // splashScreen.hide();
    });
  }
}
