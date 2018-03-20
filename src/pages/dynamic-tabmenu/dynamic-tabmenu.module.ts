import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicTabmenuPage } from './dynamic-tabmenu';

@NgModule({
  declarations: [
    DynamicTabmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicTabmenuPage),
  ],
})
export class DynamicTabmenuPageModule {}
