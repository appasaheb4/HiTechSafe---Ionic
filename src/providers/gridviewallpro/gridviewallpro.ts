import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface inaddvendor {
  getAllViewData: string;
}
  
@Injectable()
export class GridviewallproProvider {

data: any;
  constructor(public http: HttpClient) {
     this.data = null; 
  }

getAllGridData(val) {    
this.data=null;      
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: val,                                          
} 
    this.http.post<inaddvendor>('http://demo.winwaytechnology.in/ionicapp/index.php/GridViewAll/getGridViewAllData',JSON.stringify(data), {
    headers: headersNew         
  })
  .subscribe(res =>  { 
    this.data = res.getAllViewData;
    resolve(this.data);
  }, (err) =>  {
  });
});
}

}
