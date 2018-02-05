import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {
// url:string = 'http://39.106.36.37:3000/users';
// url:string = 'http://101.132.127.138:3001/users';
url:string = 'http://localhost:3001/users';
  constructor(private http: HttpClient) {}

//登录
  login(telephone,password,callback){
    this.http.post(this.url+'/login',{telephone:telephone,password:password}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }


//注册
  regist(telephone,password,username,email,callback) {
    this.http.post(this.url + '/regist', {telephone:telephone,password:password,username:username,email:email}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


  //通过手机获取id
  getIdByPhone(telephone,callback){
    this.http.post(this.url+'/getIdByPhone',{telephone:telephone}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //重置密码
  resetpass(telephone,newpass, callback) {
    this.http.post(this.url + '/resetpass', {telephone:telephone,newpass:newpass}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  //  获取验证码
  getyanzheng(tel, callback) {
    this.http.post(this.url + '/check',{telephone:tel}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //我的购物车
  myshop(telephone, callback ) {
    this.http.post(this.url + '/myshop', {telephone:telephone} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //我的足迹
  myfoot(telephone, callback ) {
    this.http.post(this.url + '/myfoot', {telephone:telephone} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //删除购物车单个物品
  delshop(shopid, callback ) {
    this.http.post(this.url + '/delshop', {shopid:shopid} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //添加订单=====================
  addorder (id,addressid,goodsid,goodsnum,goodsprice,orderbianhao, callback ) {
    this.http.post(this.url + '/addorder', {id:id,addressid:addressid,goodsid:goodsid,goodsnum:goodsnum,goodsprice:goodsprice,orderbianhao:orderbianhao} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //删除订单================================
  delorder (goodsid, callback ) {
    this.http.post(this.url + '/delorder', {goodsid:goodsid} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


  //显示地址==============
  showaddress(user_id,callback ) {
    this.http.post(this.url + '/showaddress', {id:user_id}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //删除地址==================
  deladdress(addressid,callback ) {
    this.http.post(this.url + '/deladdress', {addressid:addressid}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //添加收货地址=========
  addaddress(address,username,usertel,id,mail,callback ) {
    this.http.post(this.url + '/addaddress',
      {address:address,username:username,usertel:usertel,id:id,mail:mail}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //获取用户基本信息
  showuserinfo(user_id,callback ) {
    this.http.post(this.url + '/showuserinfo', {id:user_id}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //上传头像====
  upLoad(formData,callback){
    this.http.post(this.url+'/upload', formData).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //加入购物车============
  addshop (shopnum,goodspic,goodsname,goodsid,goodssize,id,goodsprice, callback ) {
    this.http.post(this.url + '/addshop',{shopnum:shopnum,goodspic:goodspic,goodsname:goodsname,goodsid:goodsid,goodssize:goodssize,id:id,goodsprice:goodsprice} ).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


  //===========================
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
  // addorder(body, callback ) {
  //   this.http.post(this.url + '/addorder',body ).subscribe(function (result) {
  //       callback(result);
  //     },
  //     function (error) {
  //       console.log(error.message);
  //     }
  //   )
  // }
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

