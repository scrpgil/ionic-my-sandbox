import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ZoomImagePageModule } from '../pages/zoom-image/zoom-image.module';
import { Ionic2ZoomAreaPageModule } from '../pages/ionic2-zoom-area/ionic2-zoom-area.module';
import { CustomFontPageModule} from '../pages/custom-font/custom-font.module';
import { DynamicTabmenuPageModule} from '../pages/dynamic-tabmenu/dynamic-tabmenu.module';
import { ElasticTextareaPageModule} from '../pages/elastic-textarea/elastic-textarea.module';
import { ElasticTextarea2PageModule} from '../pages/elastic-textarea2/elastic-textarea2.module';
import { TabMenuPageModule } from '../pages/tab-menu/tab-menu.module';
import { QrcodePageModule} from '../pages/qrcode/qrcode.module';

import {DirectivesModule} from "../directives/directives.module";
import {ComponentsModule} from "../components/components.module";
import { MockProvider } from '../providers/mock/mock';

//import { AngularFireModule } from 'angularfire2';
//import 'firebase/messaging'; // only import firebase messaging or as needed;
//import { firebaseConfig } from '../firebaseConfig';
//import { FirebaseMessagingProvider } from '../providers/firebase-messaging/firebase-messaging';
//import { AngularFireDatabaseModule } from "angularfire2/database-deprecated"
//import { AngularFireDatabase } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HomePageModule,
        ZoomImagePageModule,
        Ionic2ZoomAreaPageModule,
        CustomFontPageModule,
        DynamicTabmenuPageModule,
        ElasticTextareaPageModule,
        ElasticTextarea2PageModule,
        TabMenuPageModule,
        QrcodePageModule,
        DirectivesModule,
        ComponentsModule,
        //AngularFireDatabaseModule,
        //AngularFireModule.initializeApp(firebaseConfig),
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        //FirebaseMessagingProvider,
        //AngularFireDatabase ,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    MockProvider
    ]
})
export class AppModule {}
