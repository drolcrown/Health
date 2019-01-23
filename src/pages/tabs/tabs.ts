import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AcountPage } from '../acount/acount';
import { mocks } from '../../models/mocks';
import { CacheProvider } from '../../providers/cache/cache';
import { ProfissionaisPage } from '../profissionais/profissionais';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProfissionaisPage;
  tab4Root = AcountPage;

  constructor(public providerCache: CacheProvider) {
    // this.providerCache.save('perfil', mocks.perfil);
  }
}
