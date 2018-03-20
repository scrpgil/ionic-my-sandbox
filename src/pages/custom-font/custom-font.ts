import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
    name:'custom-font',
    segment:'custom-font'
})
@Component({
    selector: 'page-custom-font',
    templateUrl: 'custom-font.html',
})
export class CustomFontPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomFontPage');
    }

}
