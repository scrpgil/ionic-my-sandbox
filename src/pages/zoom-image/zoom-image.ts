import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'zoom-image',
    segment:'zoom-image'
})
@Component({
  selector: 'page-zoom-image',
  templateUrl: 'zoom-image.html',
})
export class ZoomImagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZoomImagePage');
  }

}
