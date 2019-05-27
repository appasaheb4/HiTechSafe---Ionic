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
  selector: 'page-mapviewdistanceshow',
  templateUrl: 'mapviewdistanceshow.html',
})
export class MapviewdistanceshowPage {
@ViewChild('map') mapElement: ElementRef;
  map: any;
  start:string;
  end:string;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

    data={userId:"",address:""};
  constructor(private storage:Storage,public geolocation: Geolocation,public alertCtrl: AlertController,public navCtrl: NavController,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController) {
  }

  ionViewDidLoad(){
 this.storage.get('userId').then((val) => {
   // this.getLangLat(val);
        this.initMap();
        this.start="Nagram - Nilmatha Rd, Sevai, Uttar Pradesh 226002, India";
        this.end="Hira Natepute 413109,India";
        this.calculateAndDisplayRoute()
    });
       
  }
 initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    //const first = new google.maps.LatLng(41.85, -87.65);
  //const secound = new google.maps.LatLng(-87.65, 41.55);
    this.directionsService.route({
      origin: this.start,
      destination: this.end,  
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
