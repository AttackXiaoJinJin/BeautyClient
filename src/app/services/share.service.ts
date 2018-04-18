import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShareService {
  url: string = 'http://localhost:3000/share';

  constructor(private http: HttpClient) {
  }
  //展示分享的物品
  showshare(callback) {
    this.http.post(this.url + '/showshare','').subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


}
