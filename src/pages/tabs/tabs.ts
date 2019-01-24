import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { CacheProvider } from '../../providers/cache/cache';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ConfigurationPage;

  constructor(public providerCache: CacheProvider) {
  }
}
