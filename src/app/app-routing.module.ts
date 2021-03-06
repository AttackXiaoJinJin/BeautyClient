import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IndexComponent } from './index/index.component';
//分享
import { SharesComponent} from './shares/shares.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LooksComponent } from './looks/looks.component';
import { LovesComponent } from './loves/loves.component';
import { GirlsComponent } from './looks/girls/girls.component';
import { BoysComponent } from './looks/boys/boys.component';
//时装周
import { FashionWeekComponent } from './fashion-week/fashion-week.component';
import { FashionYingComponent } from './fashion-week/fashion-ying/fashion-ying.component';
import { FashionWuComponent } from './fashion-week/fashion-wu/fashion-wu.component';
import { FashionOuComponent } from './fashion-week/fashion-ou/fashion-ou.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { SharesAreaComponent } from './shares/shares-area/shares-area.component';
import { StartComponent } from './start/start.component';
import { SearchComponent } from './search/search.component';
import { SharesMyareaComponent } from './shares/shares-myarea/shares-myarea.component';

const routes: Routes = [
  //登录
  {
    path: 'login',
    component: LoginComponent
  },
  //一开始的页面
  {
    path: 'start',
    component: StartComponent
  },
  //注册
  {
    path: 'regist',
    component: RegistComponent
  },
  //首页
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'loves',
  component: LovesComponent
},
  {
    path: 'comment',
    component: SharesComponent
  },
  //时装周
  {
    path: 'fashion-week',
    component: FashionWeekComponent
  },
  {
    path: 'fashion-ying',
    component: FashionYingComponent
  },
  {
    path: 'fashion-wu',
    component: FashionWuComponent
  },
  {
    path: 'fashion-ou',
    component: FashionOuComponent
  },
  {
    path: 'shares',
    component: SharesComponent
  },
  {
    path: 'shares-area',
    component: SharesAreaComponent
  },
  {
    path: 'shares-myarea',
    component:SharesMyareaComponent
  },
  {
    path: 'girls',
    component: GirlsComponent
  },
  {
    path: 'boys',
    component: BoysComponent
  },
  {
    path: 'looks',
    component: LooksComponent
  },
  {
    path: 'search/:json',
    component: SearchComponent
  },

  {
    path: 'shopping/:id',
    component: ShoppingComponent
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
