
import { BacktopComponent } from './backtop/backtop.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//导入路由
import {AppRoutingModule} from './app-routing.module';

//服务
import {GlobalPropertyService} from './services/global-property.service';

//模块
import {PersonalCenterModule} from './personal-center/personal-center.module';

//组件
import { AppComponent } from './app.component';
import { LooksComponent } from './looks/looks.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LovesComponent } from './loves/loves.component';
import { SharesComponent } from './shares/shares.component';
import { RegistComponent } from './regist/regist.component';
import { SharesAreaComponent } from './shares/shares-area/shares-area.component';
import { GirlsComponent } from './looks/girls/girls.component';
import { BoysComponent } from './looks/boys/boys.component';
import { FashionWeekComponent } from './fashion-week/fashion-week.component';
import { FashionYingComponent } from './fashion-week/fashion-ying/fashion-ying.component';
import { FashionWuComponent } from './fashion-week/fashion-wu/fashion-wu.component';
import { FashionOuComponent } from './fashion-week/fashion-ou/fashion-ou.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { StartComponent } from './start/start.component';
import { SharesMyareaComponent } from './shares/shares-myarea/shares-myarea.component';
import { FooterComponent } from './footer/footer.component'

//解决404问题
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoveitemComponent } from './loves/loveitem/loveitem.component';



@NgModule({
  declarations: [
    AppComponent,
    LooksComponent,
    IndexComponent,
    LoginComponent,
    SearchComponent,
    PageNotFoundComponent,
    LovesComponent,
    SharesComponent,
    GirlsComponent,
    BoysComponent,
    FashionWeekComponent,
    FashionYingComponent,
    FashionWuComponent,
    FashionOuComponent,
    ShoppingComponent,
    RegistComponent,
    SharesAreaComponent,
    StartComponent,
    FooterComponent,
    NavComponent,
    BacktopComponent,
    SidebarComponent,
    LoveitemComponent,
    SharesMyareaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PersonalCenterModule,
    AppRoutingModule

  ],
  //全局服务,解决路由刷新问题
  providers: [
    GlobalPropertyService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})

export class AppModule { }
