import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';  
import { ReportsummaryproProvider } from '../../providers/reportsummarypro/reportsummarypro';  
import {Storage} from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';

import { ReportsummaryshowgridPage } from '../reportsummaryshowgrid/reportsummaryshowgrid';
//@IonicPage()
@Component({
  selector: 'page-reportsummary',
  templateUrl: 'reportsummary.html',
providers:[ReportsummaryproProvider]
})
export class ReportsummaryPage {
private reportSummaryPage:any;
    private allVehileName:any;   
    private userId:any;  
    private maxYear:any;
    data ={vehicleName:"",formdate:"",toDate:""};   
  constructor(private _form:FormBuilder,private storage:Storage,public navCtrl: NavController,private  personservice:ReportsummaryproProvider) {
this.reportSummaryPage=this._form.group({
'data.vehicleName': [null,  Validators.required],
'data.formdate': [null,  Validators.required],
'data.toDate': [null,  Validators.required]

});
this.data.formdate=new Date().toISOString();
this.data.toDate=new Date().toISOString();
var date = new Date();
this.maxYear=date.getFullYear()+10;
this.storage.get('userId').then((val) => {
    this.getAllData(val);
    });
  }

 getAllData(userId){
this.allVehileName = null;
this.personservice.getAllVehicleName(userId)
.then(data =>{      
this.allVehileName = data;    
});
}

showGridData(){  
this.navCtrl.push(ReportsummaryshowgridPage,{   
 "param0":this.data.vehicleName,"param1":this.data.formdate,"param2":this.data.toDate
});
}

}
