import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'show-news',
    pathMatch: 'full'
  },
  {
    path: 'show-news',
    loadChildren: () => import('./show-news/show-news.module').then( m => m.ShowNewsPageModule)
  },
  {
    path: 'show-news/:id',
    loadChildren: () => import('./single-news/single-news.module').then( m => m.SingleNewsPageModule)
  },
  // {
  //   path: 'news',
  //   loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
