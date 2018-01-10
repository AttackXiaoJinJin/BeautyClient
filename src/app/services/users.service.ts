/* users接口 */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {
// url:string = 'http://39.106.36.37:3000/users';
// url:string = 'http://101.132.127.138:3001/users';
url:string = 'http://localhost:3001/users';
  constructor(
    private http: HttpClient
  ) {
}
//登录
login(user, callback) {
this.http.post(this.url + '/login', user).subscribe(function (result) {
  callback(result);
},
function (error) {
  console.log(error.message);
}
);
}

//注册
  regist(user, callback) {
    this.http.post(this.url + '/regist', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


  Resetp(user, callback) {
    this.http.post(this.url + '/Resetp', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
   comment(comment, callback) {
    this.http.post(this.url + '/comment', comment ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  commentShowmy(body,callback) {
    this.http.post(this.url + '/commentShowmy',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  backShowmysql(body,callback) {
    this.http.post(this.url + '/backShowmysql',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
check(body, callback) {
    this.http.post(this.url + '/check',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
 delmys(body, callback) {
    this.http.post(this.url + '/delmys',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  gobuy(body, callback) {
    this.http.post(this.url + '/gobuy',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  addorder(body, callback ) {
    this.http.post(this.url + '/addorder',body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  commentShow (callback) {
    this.http.post (this.url+ '/commentShow','' ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  backComment (body, callback ) {
    this.http.post(this.url+'/backcomment', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showboys( body, callback ) {
    this.http.post(this.url + '/showboys', body).subscribe(function (result) {
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
  showloves(body,callback ) {
    this.http.post(this.url + '/showloves',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  Show(callback ) {
    this.http.post(this.url + '/Show','').subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addshop (body, callback ) {
    this.http.post(this.url + '/addshop', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  addthum (body, callback ) {
    this.http.post(this.url + '/addthum', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  addloves (body, callback ) {
    this.http.post(this.url + '/addloves', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
userfoot(body, callback ) {
    this.http.post(this.url + '/userfoot', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  search (body,callback ) {
    this.http.post(this.url + '/search',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}

