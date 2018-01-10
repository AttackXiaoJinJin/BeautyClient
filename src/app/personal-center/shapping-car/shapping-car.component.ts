import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonalService} from '../../services/personal.service';
declare var $: any ;
@Component({
  selector: 'app-shapping-car',
  templateUrl: './shapping-car.component.html',
  styleUrls: ['./shapping-car.component.css'],
  providers: [PersonalService],
})
export class ShappingCarComponent implements OnInit {
 mes:any;
sum=0;
none:any;
statef:any;
  constructor(
    private perSer: PersonalService,
    private router: Router,
  ) { }
  ngOnInit() {
    let that = this;
    const body={'tel':sessionStorage.getItem('userId')}
    that.perSer.showshop(body, function (result) {
      if ( result.StateCode==0){that.none='空空如也~~~~';} else {
        that.mes= result;
        for(let i=0;i<that.mes.length;i++)
          that.mes[i].total= (that.mes[i].goodsprice) * (that.mes[i].shopsum);
      }
    })
  }
  les(index){
    let mes=this.mes;
    if(  mes[index].shopsum>0) {
      mes[index].shopsum = mes[index].shopsum - 1;
      mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
      if ($('#' + index).is(':checked') && mes[index].total >= 0) {
        this.sum = this.sum - mes[index].goodsprice;
      }
    }
  }
  add(index) {
    let mes = this.mes;
    mes[index].shopsum = mes[index].shopsum + 1;
    mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
    if ($('#' + index).is(':checked') && this.sum >= 0) {
      this.sum = this.sum + mes[index].goodsprice;
    }
  }

  del(index){let that=this;
    let mes=this.mes;
     mes[index].del = index+'s';
    that.perSer.delshop({'id':mes[index].goodsid}, function (result) {
      if ( result==1){
        $('#'+index+'s').parent().parent().parent().remove();
        if($('.circle').html()>0){
        $('.circle').html($('.circle').html()-1);}
        that.statef=true;
        setInterval(function(){
          that.statef=false;
        },2000)
      }
    })
  }
  dan(index){
    let mes = this.mes;
    if($('#'+ index).is(':checked'))
    {this.sum= this.sum+mes[index].total;
    $('#pay_id').removeAttr("disabled");
     this.addorder(index);
    }
    else{
      this.sum=this.sum-mes[index].total;
      this.delorder(index);
    }
  }
    quan(mes){
      if($(".quan").is(':checked'))
      { for(let i=0;i<mes.length;i++)
        this.sum=this.sum+mes[i].total;
        $("input[type='checkbox']").attr("checked", true);}
      else {
        $("input[type='checkbox']").removeAttr("checked");
        this.sum=0;
      }
    }

    back(){
      this.router.navigate(['/personal-center']);
    }
    gopay (){
      let sum=this.sum;let that=this;
      that.router.navigate(['/personal-center/pay',sum]);
    }
   addorder(index){
     let that = this;
     const body={'id':that.mes[index].goodsid,'shopsum':that.mes[index].shopsum,'tel':sessionStorage.getItem('userId'),
     'size':that.mes[index].goodssize }
     that.perSer.addorder(body, function (result) {
     })
   }
  delorder(index){
    let that = this;
    that.perSer.delorder({'id':that.mes[index].goodsid}, function (result) {
    })
  }
  godetail(id){
    this.router.navigate(['/shopping',id]);
  }
}
