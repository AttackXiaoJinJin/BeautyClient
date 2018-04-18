import { Component, OnInit,Input } from '@angular/core';
import {UsersService} from './../services/users.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Router} from '@angular/router';
import {GoodsService} from "../services/goods.service";
declare var $: any ;
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  providers: [UsersService,GoodsService],
})
export class ShoppingComponent implements OnInit {
//  商品id
  goodsid:any
//  商品信息
  gooddetail:any;
  _tel:any
  _id:any
  goodspic:any
  //选择的尺码
  sh=true;
//  选择的尺码的字符串s m l
  chima:any
//  界面的商品信息
  spnum:any=1
goodsname:any
  goodsprice:any

nologin:any;

size1='s';
n:any;
id:any;
state:any;
shop='ss';
sum:any;

  constructor(
    private userSer: UsersService,
    private goodSer: GoodsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    window.scrollTo(0,0);
    let  that=this
    //商品id
    that.goodsid= that.route.snapshot.paramMap.get('id');
    // console.log(that.goodsid,'40')
    that.showGoodsDetail(that.goodsid)
    // that. userSer.userfoot({'id':id,'tel':sessionStorage.getItem('userId')}, function (result) {
    // })
    if (sessionStorage.getItem('userId')) {
      that._tel = sessionStorage.getItem('userPhone')
      that._id = sessionStorage.getItem('userId')
    } else {
      //  弹出模态框
      that.router.navigate(['/login']);
    }

    //图片预览======
    $(function () {
      $('#d1').mousemove(function (e) {
        $('#d4').css('display', 'block');
        // alert(document.body.scrollTop);
        if(document.body.scrollTop<100) {
          $('#d3').css('left', e.clientX - 265).css('top', e.clientY - 300);
          if (e.clientX > 605 || e.clientX <250) {
            $('#d3').css('opacity', '0');
            $('#d4').css('display', 'none');
          }
          else {
            $('#d3').css('opacity', '0.5');
            $('#d4').css('display', 'block');
            if (e.clientX > 575) {
              $('#d3').css('left', 300);
            }
            if (e.clientX < 275) {
              $('#d3').css('left', 0);
            }
            if (e.clientY <= 275) {
              $('#d3').css('top', 0);
              $('#d4').css('background-position-x',1200 - (e.clientX) / 625 * 1200 + 100).css('background-position-y',0);
            }
            else {
              $('#d4').css('background-position-x',1200 - (e.clientX) / 625 * 1200 + 97).css('background-position-y',1200 - (e.clientY) / 590 * 1200 + 612);
              $('#d4').css('background-position-x',1200 - (e.clientX) / 625 * 1200 + 97).css('background-position-y',1200 - (e.clientY) / 590 * 1200 + 612);
            }
          }
        }
        else if(document.body.scrollTop<190){
          $('#d3').css('left', e.clientX - 265).css('top', e.clientY - 200);
          if (e.clientX > 605 || e.clientX <250) {
            // alert(e.clientX)
            $('#d3').css('opacity', '0');
            $('#d4').css('display', 'none');
          }
          else {
            $('#d3').css('opacity', '0.5');
            $('#d4').css('display', 'block');
            if (e.clientX > 575) {
              $('#d3').css('left', 300);
            }
            if (e.clientX < 275) {
              $('#d3').css('left', 0);
            }
            if (e.clientY <= 205) {
              $('#d3').css('top', 0);
              $('#d4').css('background-position-x', 1200 - (e.clientX) / 625 * 1200 + 100).css('background-position-y', 0);
            }
            else {
              $('#d4').css('background-position-x', 1200 - (e.clientX) / 625 * 1200 + 97).css('background-position-y', 1200 - (e.clientY) / 590 * 1200 + 410);
            }
          }
        }
        else {
          // alert(document.body.scrollTop);
          $('#d3').css('left', e.clientX - 265).css('top', e.clientY-30);
          if (e.clientX > 605 || e.clientX < 250) {
            $('#d3').css('display', 'none');
            $('#d4').css('display', 'none');
          }
          else {
            $('#d3').css('display', 'block');
            $('#d4').css('display', 'block');
            if (e.clientX > 575) {
              $('#d3').css('left', 300);
            }
            if (e.clientX < 275) {
              $('#d3').css('left', 0);
            }

            if (e.clientY <=20) {
              $('#d3').css('top', 0);
              $('#d4').css('background-position-x', 1200 - (e.clientX) / 625 * 1200 + 100).css('background-position-y', 0);
            }
            if(e.clientY >=535) {
              $('#d3').css('display', 'none');
              $('#d4').css('display', 'none');
            }
            else{
              $('#d3').css('display', 'block');
              $('#d4').css('display', 'block');
              $('#d4').css('background-position-x', 1200 - (e.clientX) / 625 * 1200 + 97).css('background-position-y', 1200 - (e.clientY) / 590 * 1200 + 100);

            }

          }
        }

      })
    })
  //  ============图片预览
  }

showGoodsDetail(id){
  let that=this
    that.goodSer.showdetail(id+'', function (result) {
    if( result.statusCode==0){
      console.log('erro')
    }
    else {
      that.gooddetail= result
      that.goodspic=result.goodspic
      that.goodsname=result.goodsname
      that.goodsprice=result.goodsprice
      console.log(that.gooddetail,'163')
    }
  })
}

  //选择尺码
  size_click(size) {
    this.sh=size
    let that=this
    if(size===1){
      that.chima='S'
    }else if(size===2){
      that.chima='M'
    }else{
      that.chima='L'
    }
  }

  addnum() {
    this.spnum++
  }
  cutnum() {
    let that=this
    if(that.spnum>1){
      that.spnum--
    }

  }

  addshop() {
    let that=this;

    that.userSer.addshop(that.spnum+'', that.goodspic+'',that.goodsname+'',that.goodsid+'',that.chima+'',that._id,that.goodsprice+'',function (result) {
      console.log(result.statusCode)
      if( result.statusCode===17){
      //  插入成功

      }
      else {
      //  插入失败
      }
    })
  }


//购买
buy(){
    let that = this;


}


}
