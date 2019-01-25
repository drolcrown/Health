import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MyApp } from './app.component';
 
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { StarRatingModule } from 'ionic3-star-rating';
import { environment } from '../environments/environment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Providers
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../providers/alerts/alerts';
import { CacheProvider } from '../providers/cache/cache';
import { DatePipe } from '@angular/common';
import { LoadsProvider } from '../providers/loads/loads';
import { RenderProvider } from '../providers/render/render';
import { Camera } from '@ionic-native/camera';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TabsPage } from '../pages/tabs/tabs';
import { ChildrenPage } from '../pages/children/children';
import { ChildrenRenderPage } from '../pages/children-render/children-render';
import { ExpandableComponent } from '../components/expandable/expandable';
import { InfoPage } from '../pages/info/info';

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    AboutPage,
    ChildrenPage,
    ChildrenRenderPage,
    HomePage,
    ExpandableComponent,
    ConfigurationPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StarRatingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    InfoPage,
    ChildrenPage,
    ChildrenRenderPage,
    ExpandableComponent,
    HomePage,
    TabsPage,
    ConfigurationPage,
  ],
  providers: [
    StatusBar,
    ScreenOrientation,
    SplashScreen, Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RenderProvider,
    AccessFirebaseProvider,
    AlertsProvider,
    DatePipe,
    LoadsProvider,
    CacheProvider
  ]
})
export class AppModule { }
