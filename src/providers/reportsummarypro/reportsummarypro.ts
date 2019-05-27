import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
   
interface inaddvendor {
  allVehicleName: string;  
}  
   

@Injectable()
export class ReportsummaryproProvider {
data: any;
 constructor(public http: HttpClient) {
    this.data = null; 
  }
getAllVehicleName(userId) {    
this.data=null;               
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: userId,                                           
} 
    this.http.post<inaddvendor>('http://demo.winwaytechnology.in/ionicapp/index.php/ReportSummary/getAllVehicleName',JSON.stringify(data), {
    headers: headersNew         
  })
  .subscribe(res =>  { 
    this.data = res.allVehicleName;  
    console.log(this.data);
    resolve(this.data);
  }, (err) =>  {
  });
});
}


}
