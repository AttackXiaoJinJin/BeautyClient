import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LooksService {
url:string = 'http://localhost:3001/looks';
  constructor(private http: HttpClient) {}

  //男生穿搭========
  showboys(start,end, callback ) {
    this.http.post(this.url + '/showboys',{start:start,end:end}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }




  showgirls( callback ) {
    this.http.post(this.url + '/showgirls','').subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showdetails (body, callback ) {
    this.http.post(this.url + '/showdetails', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


}

