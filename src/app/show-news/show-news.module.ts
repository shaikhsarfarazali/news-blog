import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowNewsPageRoutingModule } from './show-news-routing.module';

import { ShowNewsPage } from './show-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowNewsPageRoutingModule
  ],
  declarations: [ShowNewsPage]
})
export class ShowNewsPageModule {}
