import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'ionic2-zoom-area',
    segment:'ionic2-zoom-area'
})
@Component({
  selector: 'page-ionic2-zoom-area',
  templateUrl: 'ionic2-zoom-area.html',
})
export class Ionic2ZoomAreaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ionic2ZoomAreaPage');
  }

}
