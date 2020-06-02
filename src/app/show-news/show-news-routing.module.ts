import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowNewsPage } from './show-news.page';

const routes: Routes = [
  {
    path: '',
    component: ShowNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowNewsPageRoutingModule {}
