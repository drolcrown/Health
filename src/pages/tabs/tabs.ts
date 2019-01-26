import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { InfoPage } from '../info/info';
import { ConfigurationPage } from '../configuration/configuration';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = InfoPage;
  tab4Root = ConfigurationPage;

  constructor(public nav: NavController) {
  }
}
