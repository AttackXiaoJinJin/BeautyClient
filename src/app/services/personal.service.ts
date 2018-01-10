import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PersonalService {
  // url: string = 'http://39.106.36.37:3000/personal';
  url: string = 'http://101.132.127.138:3000/personal';

  constructor(private http: HttpClient) {
  }
  upload(user, callback) {
    this.http.post(this.url + '/upload', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  updatep(user, callback) {
    this.http.post(this.url + '/updatep', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showput(callback) {
    this.http.post(this.url + '/showput','').subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showshop(body,callback) {
    this.http.post(this.url + '/showshop',body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  getUserIcon(user, callback) {
    this.http.post(this.url + '/getUserIcon', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addorder (body, callback ) {
    this.http.post(this.url + '/addorder', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  delorder (body, callback ) {
    this.http.post(this.url + '/delorder', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  del (body, callback ) {
    this.http.post(this.url + '/del', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showorder (body, callback ) {
    this.http.post(this.url + '/showorder', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
myshop(body, callback ) {
  this.http.post(this.url + '/myshop', body ).subscribe(function (result) {
      callback(result);
    },
    function (error) {
      console.log(error.message);
    }
  )
}
  delshop(body, callback ) {
    this.http.post(this.url + '/delshop', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // all(body, callback ) {
  //   this.http.post(this.url + '/all', body ).subscribe(function (result) {
  //       callback(result);
  //     },
  //     function (error) {
  //       console.log(error.message);
  //     }
  //   )
  // }
  addhome(body,callback ) {
  this.http.post(this.url + '/addhome',body).subscribe(function (result) {
      callback(result);
    },
    function (error) {
      console.log(error.message);
    }
  )
}
  showhome(body,callback ) {
    this.http.post(this.url + '/showhome', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  showflow(body,callback ) {
    this.http.post(this.url + '/showflow', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  delhome(body,callback ) {
    this.http.post(this.url + '/delhome', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  chhome (body, callback ) {
    this.http.post(this.url + '/chhome', body ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  updatehome(body,callback ) {
    this.http.post(this.url + '/updatehome', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  changee(body,callback ) {
    this.http.post(this.url + '/changee', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  name(body, callback ) {
    this.http.post(this.url + '/name', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  change(body, callback ){
    this.http.post(this.url + '/change', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  deldan(body, callback ){
    this.http.post(this.url + '/deldan', body).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
