import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GoodsService {
url:string = 'http://localhost:3001/goods';
  constructor(private http: HttpClient) {}

  //商品详情
  showdetail (goodsid, callback ) {
    this.http.post(this.url + '/showdetail',{goodsid:goodsid}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }




}

