import { Component,ViewChild, ElementRef } from '@angular/core';
import {  NavController } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';   
declare var google;

interface mapallView {
  getlagandlat: any;
}


//@IonicPage()
@Component({
  selector: 'page-mapviewall',
  templateUrl: 'mapviewall.html',
})
export class MapviewallPage {
@ViewChild('map') mapElement: ElementRef;

    data={userId:"",address:""};
    public getAllData:any;
     constructor(private storage:Storage,public geolocation: Geolocation,public alertCtrl: AlertController,public navCtrl: NavController,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController) {
    }

 ionViewDidLoad(){
 this.storage.get('userId').then((val) => {
    this.getLangLat(val);
    });
       
  }  

getLangLat(val){         
let loader = this.loading.create({    
content: 'Wating.........',         
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {  
userId:val,                          
}
this.http.post<mapallView>('http://demo.winwaytechnology.in/ionicapp/index.php/MapViewAll/getLagAndLat', JSON.stringify(data), {  
    headers: headersNew         
  })  
.subscribe(res => {          
 this.getAllData=res.getlagandlat;  
var lat= this.getAllData[0].lat;
var lag= this.getAllData[0].lag;
this.data.address=this.getAllData[0].address; 
this.loadMap(lat,lag);
loader.dismiss();     
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Google map error.',
duration: 2000
});
toast.present();
});
});

}

 
  loadMap(lat,lag){
    const location = new google.maps.LatLng(lat, lag);
    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId:'hybrid'    ///google.maps.MapTypeId.ROADMAP
    }
    const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker(location,map);
 }
  
 
addMarker(possition,map){
  let marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: map.getCenter()  
  });
 let content = "<h4>"+this.data.address+"</h4>";         
  this.addInfoWindow(marker, content,map);
}


addInfoWindow(marker, content,map){
 let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(map, marker);
  });
 
}

}
