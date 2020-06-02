import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleNewsPage } from './single-news.page';

const routes: Routes = [
  {
    path: '',
    component: SingleNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleNewsPageRoutingModule {}
