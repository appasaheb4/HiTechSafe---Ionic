import { Component } from '@angular/core';
import { ActionSheetController,Platform, NavController, NavParams} from 'ionic-angular';
import {  Validators,FormBuilder } from '@angular/forms';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';  


import { ChangepasswordPage } from '../changepassword/changepassword';
declare var cordova: any;
interface myProfile {
  userAllInformation: string;
}
//@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
public updateStatus: boolean = false;
public disName: boolean = false;
public myprofileForm:any;
public allUserData:any;
public base64Image:any;
profileIcon: string = null;

public coverImage:any;
profileCoverImage: string = null;


data = {customerName:"",customerAddress:"",email:"",mobileNo:"",userName:"",adharNo:"",licenceNo:"",userId:""};
  constructor(public platform: Platform,public actionSheetCtrl: ActionSheetController,private transfer: Transfer,private camera: Camera, private file: File, private filePath: FilePath,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
this.myprofileForm=this._form.group({  
'data.customerName': [null,  Validators.required],
'data.customerAddress': [null,  Validators.required],
'data.mobileNo': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'data.email' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'data.userName': [null,  Validators.required],
'data.adharNo' : [null],
'data.licenceNo': [null]
});
this.storage.get('userId').then((val) => {
this.data.userId=val;
});
this.loadData();
}



public presentActionSheet(type) {
let actionSheet = this.actionSheetCtrl.create({
title: 'Select Image Source',
buttons: [
{
text: 'Load from Library',
handler: () => {
this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,type);
}
},
{
text: 'Use Camera',
handler: () => {
this.takePicture(this.camera.PictureSourceType.CAMERA,type);
}
},
{
text: 'Cancel',
role: 'cancel'
}
]
});
actionSheet.present();
}

public takePicture(sourceType,type) {
// Create options for the Camera Dialog
var options = {
quality: 100,
sourceType: sourceType,
saveToPhotoAlbum: false,
correctOrientation: true
};
  	 
// Get the data of an image
this.camera.getPicture(options).then((imagePath) => {
// Special handling for Android library
if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
this.filePath.resolveNativePath(imagePath)
.then(filePath => {
let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),type);
});
} else {
var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),type);
}
}, (err) => {
this.presentToast('Error while selecting image.');
});
}


//Create a new name for the image
private createFileName() {
var d = new Date(),
n = d.getTime(),
newFileName =  n + ".jpg";
return newFileName;
}
   
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName,type) {
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
//if(type=="profile")
//this.profileIcon = newFileName;
//else
//this.coverImage = newFileName;

this.uploadImage(newFileName,type);

}, error => {
this.presentToast('Error while storing file.');
});
}
   
private presentToast(text) {
let toast = this.toastCtrl.create({
message: text,
duration: 3000,
position: 'top'
});
toast.present();
}
   
// Always get the accurate path to your apps folder
public pathForImage(img) {
if (img === null) {
return '';
} else {
return cordova.file.dataDirectory + img;
}
}



public uploadImage(val,type) {
var url = "http://demo.winwaytechnology.in/ionicapp/index.php/MyProfile/mobileUploadImage";
var targetPath = this.pathForImage(val);
var options = {
chunkedMode: false,
fileKey: "file",      
fileName: val,
mimeType: "multipart/form-data",
params : {
'file': val,'userId': this.data.userId , 'type' : type }
};   
const fileTransfer: TransferObject = this.transfer.create();
let loader = this.loading.create({
content: 'Wait...',
});
loader.present();
fileTransfer.upload(targetPath,url, options).then(data => {
loader.dismissAll()
this.platform.ready()
.then(() => {
console.log(this.platform.is('android'))
}) 
this.loadData();
console.log('Image succesful uploaded.');
}, err => {
loader.dismissAll()
alert('Error while uploading file.');
});
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
this.data.customerName=this.allUserData[0].CustomerName;  
this.data.customerAddress=this.allUserData[0].CustomerAddress;
this.data.mobileNo=this.allUserData[0].MobileNo;
this.data.email=this.allUserData[0].EmailID;
this.data.userName=this.allUserData[0].UserName;   
this.data.adharNo=this.allUserData[0].AdharNo;
this.data.licenceNo=this.allUserData[0].LicenceNo;   
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

updateData(){
let loader = this.loading.create({
content: 'Wating.........',
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
cusName: this.data.customerName,
address: this.data.customerAddress,
mobileNo:this.data.mobileNo, 
email:this.data.email,
userName:this.data.userName,
adharNo:this.data.adharNo,
linceNo:this.data.licenceNo,
userId: this.data.userId,
}          
this.http.post('http://demo.winwaytechnology.in/ionicapp/index.php/MyProfile/updateDataMobile', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
if(res.toString()=="yes")             
{
loader.dismiss();     
let toast = this.toastCtrl.create({
message: 'Update Data',
duration: 2000    
});
toast.present();
this.updateStatus=false;  
this.disName=false;   
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Update Data.',
duration: 2000
});
toast.present();
});
});
}



editAction(){
this.updateStatus=true;  
this.disName=true;
}
  
openChangePassword(){
this.navCtrl.push(ChangepasswordPage);
}

  

}
