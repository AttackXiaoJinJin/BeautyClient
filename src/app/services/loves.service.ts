import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LovesService {
url:string = 'http://localhost:3001/loves';
  constructor(private http: HttpClient) {}

  showloves(start,callback ) {
    this.http.post(this.url + '/showloves',{start:start}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  insertloves (userid,goodsid, callback ) {
    this.http.post(this.url + '/insertloves',{userid:userid,goodsid:goodsid} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //删除该关注
  deleteloves(userid,goodsid,callback){
    this.http.post(this.url+'/deleteloves',{userid:userid,goodsid:goodsid}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //===========显示该衣服是否收藏
  showalllove(userid,goodsid,callback){
    this.http.post(this.url+'/showallloves',{userid:userid,goodsid:goodsid}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  //====================显示收藏数
  showlovenum(goodsid,callback){
    this.http.post(this.url+'/showlovenum',{goodsid:goodsid}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }



}

