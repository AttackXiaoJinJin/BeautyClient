import { Injectable } from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  serverUrl:string;
  hiddenNavs=false;
  constructor() {
// this.serverUrl='http://127.0.0.1:3000';
this.serverUrl='http://101.132.127.138:3000';
}
}
