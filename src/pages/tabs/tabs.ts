import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {  NavController,AlertController  } from 'ionic-angular';


import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { HelpPage } from '../help/help';
import { ProfilePage } from '../profile/profile';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ProfilePage;   
  tab3Root = HelpPage;
  constructor(private navCtrl: NavController,public alertCtrl: AlertController,private storage:Storage,) {
    }

logout(){     
let confirm = this.alertCtrl.create({
      title: '',
      message: 'Are you sure you want to Logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',  
          handler: () => {
           this.storage.remove('userId');
this.storage.remove('userName');
this.storage.remove('password');
this.storage.remove('userId'); 
this.navCtrl.setRoot(LoginPage);  
          }
        }
      ]
    });
    confirm.present();   
}
}
