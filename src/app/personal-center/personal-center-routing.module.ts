/**
 * Created by lzhan on 2017/9/3.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PersonalCenterComponent } from './personal-center.component';
import { MyflowComponent } from './myflow/myflow.component';
import { PayComponent } from './pay/pay.component';
import { CenterComponent } from './center/center.component';
import { ShappingCarComponent } from './shopping-car/shopping-car.component';

const routes: Routes = [

  {
    path: 'personal-center',
    component: PersonalCenterComponent,
    children: [
      {
        path: '',
        redirectTo: 'center',
        pathMatch: 'full'
      },
      {
        path: 'center',
        component: CenterComponent,
      },
      {
        path: 'shopping-car',
        component: ShappingCarComponent,
      },
      {
        path: 'myflow',
        component: MyflowComponent,
      },
      {
        path: 'pay/:sum',
        component: PayComponent,
      },
      {
        path: 'pay',
        component: PayComponent,
      },
     ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCenterRoutingModule {
}
