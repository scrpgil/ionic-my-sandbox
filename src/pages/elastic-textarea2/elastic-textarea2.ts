import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'elastic-textarea2',
    segment:'elastic-textarea2'
})
@Component({
    selector: 'page-elastic-textarea2',
    templateUrl: 'elastic-textarea2.html',
})
export class ElasticTextarea2Page {
    text = " 　 ∧＿∧\n 　（　´∀｀）\n 　（　　　　）\n 　｜ ｜　|\n 　（_＿）＿）\n";
    text2 = " 　 ∧＿∧\n 　（　´∀｀）\n 　（　　　　）\n 　｜ ｜　|\n 　（_＿）＿）\n";
    loaded:boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ElasticTextareaPage');
        this.loaded = true;
    }

}
