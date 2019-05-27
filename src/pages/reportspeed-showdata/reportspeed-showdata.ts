import { Component,ViewChild, ElementRef } from '@angular/core';
import {  NavController,NavParams,Platform } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation'; 


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

interface summaryData {   
  getReportSpeed: any;   
}

//@IonicPage()
@Component({
  selector: 'page-reportspeed-showdata',
  templateUrl: 'reportspeed-showdata.html',
})
export class ReportspeedShowdataPage {
private printData: any = [];
letterObj = {
    to: '',
    from: '',
    text: ''
  }
    pdfObj = null;
    private getSpeedData:any;
   data ={vehicleName:"",startDate:"",endDate:"",speed:""};
  constructor(private storage:Storage,public geolocation: Geolocation,public alertCtrl: AlertController,public navCtrl: NavController,public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController, private plt: Platform, private file: File, private fileOpener: FileOpener) {
this.data.vehicleName = navParams.get('param0');   
this.data.startDate = navParams.get('param1');
this.data.endDate = navParams.get('param2');
this.data.speed = navParams.get('param3');   
this.loadData(this.data.vehicleName,this.data.startDate,this.data.endDate,this.data.speed);   
  }

  
loadData(vehicleName,startDate,endDate,speed){
let loader = this.loading.create({    
content: 'Wating.........',         
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {  
vehicleName:vehicleName, 
startDate: startDate,
endDate :endDate,
speed :speed
                        
}
this.http.post<summaryData>('http://demo.winwaytechnology.in/ionicapp/index.php/ReportSpeed/getrepootSpeedDataMobile', JSON.stringify(data), {  
    headers: headersNew         
  })  
.subscribe(res => {                
console.log(res);        
 this.getSpeedData=res.getReportSpeed;  
loader.dismiss();     
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'No data found.',
duration: 2000
});
toast.present();
});
});
}





createPdf(dataLocal) {
    var headers = {
    fila_0:{
        col_1:{ text: 'Vehicle Name', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_2:{ text: 'Date&Time    ', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_3:{ text: 'Address       ', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_4:{ text: 'Speed', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_5:{ text: 'Latitude', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_6:{ text: 'Longitude', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
    },
    fila_1:{
        col_1:{ text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2:{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, 
        col_3:{ text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4:{ text: 'Header 4', style: 'tableHeader', alignment: 'center' },
        col_5:{ text: 'Header 5', style: 'tableHeader', alignment: 'center' },
        col_6:{ text: 'Header 6', style: 'tableHeader', alignment: 'center' }, 
    }
}
var rows = dataLocal;
//console.log(rows[0].id);
var body = [];
for (var key in headers){
    if (headers.hasOwnProperty(key)){
        var header = headers[key];
        var row = new Array();
        row.push( header.col_1 );
        row.push( header.col_2 );
        row.push( header.col_3 );
        row.push( header.col_4 );
        row.push( header.col_5 );
        row.push( header.col_6 );
        body.push(row);
    }
}

 for(var i = 0; i < rows.length; i++){   
        var row = new Array();
        row.push( rows[i].VehicleName.toString() );
        row.push( rows[i].DateTime.toString() );  
        row.push( rows[i].Address.toString() );  
        row.push( rows[i].Speed.toString() );  
        row.push( rows[i].lat.toString() );  
        row.push( rows[i].lag.toString() ); 
        body.push(row);
    }


var dd = {
        pageOrientation: 'landscape',   
        pageSize: 'A4',    
        content: [
        { text: '...OM SAI RAM...', style: 'nameHeader' },
        { text: 'HiTechSafe', style: 'hotleName' },
        
            {
                style: 'tableExample',
                table: {
                    widths: ['15%', '15%', '30%', '10%','20%','10%'],
                    headerRows: 2,
                    body: body
                }
            },
            { text: ' ' , alignment: 'right' },
            { text: 'THANKS....', alignment: 'center' }

],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 20, 0, 0]
            },
 nameHeader: {
         alignment: 'center'
        },
hotleName:{
 alignment: 'center',
fontSize: 35,   
fontfamily: 'Courgette'
},
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
        }
}

    this.pdfObj = pdfMake.createPdf(dd);
    this.downloadPdf(); 
  }        
 
getPrintDataAgain(){
this.createPdf(this.getSpeedData); 
}   


  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App  
        this.file.writeFile(this.file.dataDirectory, 'ReportSpeed.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools    
          this.fileOpener.open(this.file.dataDirectory + 'ReportSpeed.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }



}
