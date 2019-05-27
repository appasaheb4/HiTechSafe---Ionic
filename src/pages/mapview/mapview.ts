import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MapviewallPage } from '../mapviewall/mapviewall';
import { MapviewofflinePage } from '../mapviewoffline/mapviewoffline';
import { MapviewdistanceshowPage } from '../mapviewdistanceshow/mapviewdistanceshow';
//@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {  

    private viewAll =MapviewallPage;
    private offline =MapviewofflinePage;
    private mapDistance =MapviewdistanceshowPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }      
   
  openPage(page) {  
    this.navCtrl.push(page);
}  

}
