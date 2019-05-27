import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { TabsPage } from '../tabs/tabs';

//@IonicPage()
@Component({  
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
private loginForm:any; 

data={userName:"",password:"",tokenNo:""};

  constructor(private _form:FormBuilder,private alertCtrl: AlertController,private menu: MenuController,private navCtrl: NavController,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private storage:Storage) {
this.loginForm=this._form.group({
'this.data.userName': [null,  Validators.required],
'this.data.password': [null,  Validators.required],
});
  }

  ionViewDidEnter() {
this.menu.enable(false, 'menu1');
}



login(){
let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {        
userName: this.data.userName,     
password: this.data.password,
tokenNo: '1234',             
}   
this.http.post('http://demo.winwaytechnology.in/ionicapp/index.php/Login/loginMobile', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => {  
var newArry= res.toString();;
var array =  newArry.split('='); 
if(array[0]=="yes")    
{
loader.dismiss();   
this.storage.set('userName',this.data.userName);
this.storage.set('password',this.data.password);  
this.storage.set('userId', array[1]);   
this.navCtrl.setRoot(TabsPage);
}
else{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct username number and password.',
duration: 2000
});
toast.present();
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct username number and password.',
duration: 2000
});
toast.present();
});
});

}

emailSent() {      
	  let alert = this.alertCtrl.create({
	    title: 'Forgot Password',
	    inputs: [
	      {
	        name: 'email',
                type:'email',
	        placeholder: 'Email'
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	      },
	      {
	        text: 'Sent',
	        handler: data12 => {
	        let loader = this.loading.create({
	        	    content: 'Wating.........',
	        	  });
	        	loader.present().then(() => {
	        	let headersNew = new HttpHeaders();
                        headersNew.append('Content-Type', 'application/json');
	        	  let data = {
	        	  email: data12.email   
	        	}
                        this.http.post('http://demo.winwaytechnology.in/ionicapp/index.php/Login/forgotPasswordMobile', JSON.stringify(data), {
                             headers: headersNew  
                            })
                        .subscribe(res => { 
	        	  if(res.toString()=="yes")
	        	  {   
	        	    loader.dismiss();
	        	    let toast = this.toastCtrl.create({
	        	    message: 'Email sent thanks.',
	        	    duration: 2000
	        	  });
	        	  toast.present();
	        	  }
	        	  else{
	        	    loader.dismiss();
	        	    let toast = this.toastCtrl.create({
	        	    message: 'Correct insert email Address.',
	        	    duration: 2000
	        	  });
	        	  toast.present();

	        	  }
	        	}, (err) => {
	        		 loader.dismiss();
	        		    let toast = this.toastCtrl.create({
	        		    message: 'Password not sent.',
	        		    duration: 2000
	        		  });
	        		  toast.present();
	        	});
	        	 });

	          
	          
	          
	        }
	      }
	    ]
	  });
	  alert.present();
	}

}
