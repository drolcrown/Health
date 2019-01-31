import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { CacheProvider } from '../providers/cache/cache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  // rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, name: string, icon: string }>;

  constructor(public platform: Platform, private authorization: AngularFireAuth,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    // this.cache.clear();
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString('#ffffff');
      // this.splashScreen.hide();
      this.statusBar.show();
    });
  }
}
