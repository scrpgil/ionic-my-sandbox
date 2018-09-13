import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";

import "aa-ui/dist/aa-ui";

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
