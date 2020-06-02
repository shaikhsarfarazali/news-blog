import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx'; 

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.page.html',
  styleUrls: ['./single-news.page.scss'],
})
export class SingleNewsPage implements OnInit {

  public showDetail: User[];
  public loadNews: any;

  public nid: number;

  constructor(public network:Network, 
    private dialog: Dialogs,
    public toastController:ToastController, 
    private router: Router,
    private activeRoute: ActivatedRoute) {
    }

  ngOnInit() {
      this.showDetails();
  }

  showDetails(){
    this.showDetail = JSON.parse(localStorage.getItem('allDetails'));
    this.activeRoute.params.subscribe(params =>{
      this.nid = params['id'];
      this.showDetail.forEach((item, index) => {
        if(item.id==this.nid){
          let collect = (item);
          this.loadNews = (collect);
        }
        else{
          return;
        }
      });
    });
  }
}
