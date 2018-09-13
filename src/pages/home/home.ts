import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage({
  name: "home",
  segment: "home"
})
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  aa =
    "　　　　　　*　　　＿＿＿_\n 　　　　+　。　／ ＼　　／＼　ｷﾘｯ\n 　　 　　　　／　（ー） 　（ー）＼+　。　*\n 　　　　　／　　 ⌒（__人__）⌒ .＼\n 　　+　。|　　 　　　|r┬-|　　　　|　　+　。\n 　　　　　＼　　　　 `ー'´　　　／\n 　　　　 　　＼　,,,,　　　　,,, ／　+　。\n 　　　　　　 ／　　　　　　　 ＼\n 　　　　　／　,､　　　　　　.l>　,>\n 　　　　　＼　ﾘ　　　　　　 l　<\n 　　　　　　<_/　　　　　　　ト-'\n 　　　　　　　ｉ　　　　　　　 l\n .　　　　　　 l　　　　　　　　l\n 　　　　　　 ｌ　　 ､__.　　　　ｌ\n 　　　　　　 ｌ　　　 ∧　　　 ｌ\n .　　　　　　l　　　 /　ｌ.　　　ｌ\n 　　　 ,､-''ｌ　　　/'￣ｌ　　　ｌ'-､\n 　　／　　(＿＿ﾉ　　 ﾞ'-､,＿)　＼\n 　 /　　　　　　　　　　　　　　　　 ｉ\n 　 l　　 　　ア　イ　ド　ル　 　　/\n 　　ﾞ'-､, ＿＿＿＿＿＿_ ,､ - '''\n";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
}
