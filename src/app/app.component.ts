import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AcountPage } from '../pages/acount/acount';
import { CacheProvider } from '../providers/cache/cache';
import { ListComponent } from '../components/list/list';
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, name: string }>;

  constructor(public platform: Platform, private provider: AccessFirebaseProvider,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.registerBackButtonAction(() => {
      if (this.nav.length() <= 1) {
        this.platform.exitApp();
      } else {
        this.nav.pop();
      }
    });
    this.platform.ready().then(() => {
      // this.statusBar.backgroundColorByHexString('#ffffff');
      // this.splashScreen.hide();
      this.statusBar.show();
    });
  }
}
