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
  //女生穿搭
  showgirls( start,end,callback ) {
    this.http.post(this.url + '/showgirls',{start:start,end:end}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }




}

