import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { PersonalCenterComponent } from './personal-center.component';
import { MyflowComponent } from './myflow/myflow.component';
import { PayComponent } from './pay/pay.component';
import { ShappingCarComponent } from './shopping-car/shopping-car.component';

//导入路由模块

import {PersonalCenterRoutingModule} from './personal-center-routing.module';
import { CenterComponent } from './center/center.component';
import { MyhomeComponent } from './myhome/myhome.component';



@NgModule({
  declarations: [
    PersonalCenterComponent,
    MyflowComponent,
    PayComponent,
    ShappingCarComponent,
    CenterComponent,
    MyhomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterRoutingModule
  ],
  providers: [],
  bootstrap: [PersonalCenterComponent]
})
export class PersonalCenterModule { }
