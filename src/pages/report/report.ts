import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


import { ReportsummaryPage } from '../reportsummary/reportsummary';
import { ReportidlePage } from '../reportidle/reportidle';
import { ReportspeedPage } from '../reportspeed/reportspeed';
//@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
    private reportSummary=ReportsummaryPage;
    private idelReport=ReportidlePage;
    private reportSpeed=ReportspeedPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }   
    
  openPage(page) {  
    this.navCtrl.push(page);
}     

}
