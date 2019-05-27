import { Component } from '@angular/core';
import { NavController,Platform  } from 'ionic-angular';
import {Storage} from '@ionic/storage';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

interface inaddvendor {
  getAllViewData: string;
}

import { GridviewallproProvider } from '../../providers/gridviewallpro/gridviewallpro';
//@IonicPage()
@Component({   
  selector: 'page-gridviewall',
  templateUrl: 'gridviewall.html',
 providers:[GridviewallproProvider]    
})
export class GridviewallPage {
private printData: any = [];
letterObj = {
    to: '',
    from: '',
    text: ''
  }
    pdfObj = null;
    data={userId:""};

    private getLocalAllData : any;
    constructor(private storage:Storage,private  personservice:GridviewallproProvider,public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) {
    this.storage.get('userId').then((val) => {
    this.getAllData(val);
    this.data.userId =val;
    });
    }


getAllData(userId){
this.getLocalAllData = null;
this.personservice.getAllGridData(userId)
.then(data =>{  
this.getLocalAllData = data;
});
}

doRefresh(refresher){
  this.getLocalAllData = null;
this.personservice.getAllGridData(this.data.userId)
.then(data =>{  
this.getLocalAllData = data;
});
      if(refresher != 0)
         refresher.complete();
};



 createPdf(dataLocal) {
    var headers = {
    fila_0:{
        col_1:{ text: 'Vehicle Name', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_2:{ text: 'Status', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_3:{ text: 'Ignition', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_4:{ text: 'Speed', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_5:{ text: 'ODO', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_6:{ text: 'Battery_Vott', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_7:{ text: 'Address', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_8:{ text: 'Vehicle Type', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_9:{ text: 'IMEI', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_10:{ text: 'Mobile No', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_11:{ text: 'DOI', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
       
    },
    fila_1:{
        col_1:{ text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2:{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, 
        col_3:{ text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4:{ text: 'Header 4', style: 'tableHeader', alignment: 'center' },
        col_5:{ text: 'Header 5', style: 'tableHeader', alignment: 'center' },
        col_6:{ text: 'Header 6', style: 'tableHeader', alignment: 'center' }, 
        col_7:{ text: 'Header 7', style: 'tableHeader', alignment: 'center' },
        col_8:{ text: 'Header 8', style: 'tableHeader', alignment: 'center' },
        col_9:{ text: 'Header 9', style: 'tableHeader', alignment: 'center' },
        col_10:{ text: 'Header 10', style: 'tableHeader', alignment: 'center' }, 
        col_11:{ text: 'Header 11', style: 'tableHeader', alignment: 'center' },
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
        row.push( header.col_8 );
        row.push( header.col_9 );
        row.push( header.col_10 );
        row.push( header.col_11 );
        body.push(row);
    }
}

 for(var i = 0; i < rows.length; i++){   
        var row = new Array();
        row.push( rows[i].VehicleName.toString() );
        if(rows[i].Digital_2_input_status.toString()=="0"){
        row.push( 'Idel');
        row.push( 'OFF' );
        }
        else{
            row.push( 'Run');
            row.push( 'ON' );
         }
        row.push( rows[i].Speed.toString() );  
        row.push( rows[i].Odometer.toString() );  
        row.push( rows[i].Main_Battery_Voltage.toString() );  
        row.push( rows[i].address.toString() );  
        row.push( rows[i].VehicleType.toString() );  
        row.push( rows[i].IMEI.toString() );  
        row.push( rows[i].MobileNo.toString() );  
        row.push( rows[i].Date.toString() );  
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
                    widths: ['10%', '5%', '5%', '5%','10%','5%','20%','10%','10%','10%','10%'],
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
this.personservice.getAllGridData(this.data.userId)
.then(data =>{     
this.createPdf(data); 
});
}   


  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App  
        this.file.writeFile(this.file.dataDirectory, 'GridAll.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'GridAll.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }



}
