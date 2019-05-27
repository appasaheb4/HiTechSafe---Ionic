import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


import { GridviewallPage } from '../gridviewall/gridviewall';
import { GridviewofflinePage } from '../gridviewoffline/gridviewoffline';
//@IonicPage()
@Component({
  selector: 'page-gridview',
  templateUrl: 'gridview.html',
})
export class GridviewPage {
    private girdAll=GridviewallPage;
    private offline=GridviewofflinePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 openPage(page) {  
    this.navCtrl.push(page);
}  

}
