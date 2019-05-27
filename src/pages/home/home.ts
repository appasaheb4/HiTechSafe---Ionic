import { Component } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Storage} from '@ionic/storage';


import { RoutehistoryPage } from '../routehistory/routehistory';
import { GridviewPage } from '../gridview/gridview';
import { MapviewPage } from '../mapview/mapview';
import { ReportPage } from '../report/report';
import { DashboardPage } from '../dashboard/dashboard';


interface myProfile {
  userAllInformation: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
private gridView = GridviewPage;
private routeHistory = RoutehistoryPage;   
private mapView = MapviewPage;
private report = ReportPage;
private dashboard = DashboardPage;  
public coverImage:any;
public base64Image:any;
public allUserData:any;
data= {userId:""};
  constructor(public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public actionSheetCtrl: ActionSheetController,private socialSharing: SocialSharing,private callNumber: CallNumber,public navCtrl: NavController) {
this.storage.get('userId').then((val) => {
this.data.userId=val;
});
this.loadData();
  }

openPage(page) {  
    this.navCtrl.push(page);
}   

regularShareMenu(){
this.socialSharing.share('HiTechSafe','Ionic Application','http://demo.winwaytechnology.in/ionicapp/Content/Images/AppImages/LoginPage/splash.png','http://demo.winwaytechnology.in');

}



launchDialer(){
this.callNumber.callNumber('+917020353042', true)
.then(() => console.log('Launched dialer!'))
.catch(() => console.log('Error launching dialer'));
}  



loadData(){  
this.allUserData=null;
let loader = this.loading.create({
content: 'Wating.........',   
});                            
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id: this.data.userId,                   
}     

this.http.post<myProfile>('http://demo.winwaytechnology.in/ionicapp/index.php/MyProfile/getUserInfomation', JSON.stringify(data), {
    headers: headersNew
  })   
  .subscribe(res =>  {
this.allUserData=res.userAllInformation;  
this.base64Image=this.allUserData[0].imagePath; 
this.coverImage=this.allUserData[0].coverImage; 
loader.dismiss();
}, (err) => {     
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Data not found.',       
duration: 2000
});
toast.present();
});
});
}  

}
