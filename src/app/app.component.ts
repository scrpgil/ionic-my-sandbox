import { Component } from '@angular/core';
import { MenuController,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { FirebaseMessagingProvider } from '../providers/firebase-messaging/firebase-messaging';


export interface Menu {
    pageName: string;
    label: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = 'home';
    menu1: Array<Menu> = [
        {
            pageName: 'home',
            label: 'Home',
        },
        {
            pageName: 'zoom-image',
            label: 'ZoomImage',
        },
        {
            pageName: 'ionic2-zoom-area',
            label: 'ionic2-zoom-area',
        },
        {
            pageName: 'tab-menu',
            label: 'tab-menu',
        },
        {
            pageName: 'dynamic-tabmenu',
            label: 'dynamic-tabmenu',
        },
        {
            pageName: 'custom-font',
            label: 'custom-font',
        },
        {
            pageName: 'elastic-textarea',
            label: 'elastic-textarea',
        },
        {
            pageName: 'elastic-textarea2',
            label: 'elastic-textarea2',
        },
        {
            pageName: 'qrcode',
            label: 'QRCode',
        },
    ];
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu:MenuController) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    changeRoot(page: string) {
        this.menu.close();
        this.rootPage = page;
    }
}

