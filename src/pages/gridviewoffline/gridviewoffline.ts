import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-gridviewoffline',
  templateUrl: 'gridviewoffline.html',
})
export class GridviewofflinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GridviewofflinePage');
  }

}
