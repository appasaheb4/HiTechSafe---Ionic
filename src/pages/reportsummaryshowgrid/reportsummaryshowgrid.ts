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
  getSummaryAllData: any;
}

//@IonicPage()
@Component({
  selector: 'page-reportsummaryshowgrid',
  templateUrl: 'reportsummaryshowgrid.html',
})
export class ReportsummaryshowgridPage {
private printData: any = [];
letterObj = {
    to: '',
    from: '',
    text: ''
  }
    pdfObj = null;
    private getAllSummaryData:any;
    data ={vehicleName:"",startDate:"",endDate:""};
  constructor(private storage:Storage,public geolocation: Geolocation,public alertCtrl: AlertController,public navCtrl: NavController,public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController, private plt: Platform, private file: File, private fileOpener: FileOpener) {
this.data.vehicleName = navParams.get('param0');   
this.data.startDate = navParams.get('param1');
this.data.endDate = navParams.get('param2');


console.log(this.data.startDate);
console.log(this.data.endDate);


this.loadData(this.data.vehicleName,this.data.startDate,this.data.endDate);   
  }



 
loadData(vehicleName,startDate,endDate){
let loader = this.loading.create({    
content: 'Wating.........',         
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {  
vehicleName:vehicleName, 
startDate: startDate,
endDate :endDate                         
}
this.http.post<summaryData>('http://demo.winwaytechnology.in/ionicapp/index.php/ReportSummary/getDemoData', JSON.stringify(data), {  
    headers: headersNew         
  })  
.subscribe(res => {                
console.log(res);        
 this.getAllSummaryData=res.getSummaryAllData;  
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
        col_2:{ text: 'Start Date&Time', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_3:{ text: 'Start Address', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_4:{ text: 'End Date&Time', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_5:{ text: 'End Address', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_6:{ text: 'Total_Running_Hours', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_7:{ text: 'Total_Idle_Hours', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
    },
    fila_1:{
        col_1:{ text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2:{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, 
        col_3:{ text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4:{ text: 'Header 4', style: 'tableHeader', alignment: 'center' },
        col_5:{ text: 'Header 5', style: 'tableHeader', alignment: 'center' },
        col_6:{ text: 'Header 6', style: 'tableHeader', alignment: 'center' }, 
        col_7:{ text: 'Header 7', style: 'tableHeader', alignment: 'center' },
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
        row.push( header.col_7 );
        body.push(row);
    }
}

 for(var i = 0; i < rows.length; i++){   
        var row = new Array();
        row.push( rows[i].VehicleName.toString() );
        row.push( rows[i].startDate.toString() );  
        row.push( rows[i].startAddress.toString() );  
        row.push( rows[i].endTime.toString() );  
        row.push( rows[i].endAddress.toString() );  
        row.push( rows[i].Total_Running_Hours.toString() ); 
        row.push( rows[i].Total_Idle_Hours.toString() );   
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
                    widths: ['15%', '10%', '20%', '10%','20%','10%','15%'],
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
this.createPdf(this.getAllSummaryData); 
}   


  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App  
        this.file.writeFile(this.file.dataDirectory, 'ReportSummary.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'ReportSummary.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }




}
