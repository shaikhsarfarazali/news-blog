import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  newArray: User[];
  image:any;
  public title:string;
  public author:string;
  public description:string;
  counter=1;


  // image upload
  fileData: File = null;
  public previewUrl: any;
  constructor(
    private alertCtrl: AlertController, private router: Router) {

    this.newArray = [];
  }

  ngOnInit(){
  }

  news(Title,Description,Image,Author, id=this.counter++){ 

    try{
      if(/^[a-zA-Z '\s-]+$/.test(Title) != true){
        this.alertCtrl.create({
          header: 'Invalid', 
          message: 'Please Enter Only Character',
          buttons:[{
            text:'OK',
            role:'OK'
          }]
      })
        .then(alertEl => {
          alertEl.present();
        });
        this.title = null;
        return;
      }
      else if(this.title==""){
        this.alertCtrl.create({
          header: 'Invalid', 
          message: 'title is required',
          buttons:[{
            text:'OK',
            role:'OK'
          }]
      })
        .then(alertEl => {
          alertEl.present();
        });
        this.title = null;
        return;
      }
      else if(Description==""){
        this.alertCtrl.create({
          header: 'Invalid', 
          message: 'Description is required',
          buttons:[{
            text:'OK',
            role:'OK'
          }]
      })
        .then(alertEl => {
          alertEl.present();
        });
        this.title = null;
        return;
      }
      else if(this.image==""){
        this.alertCtrl.create({
          header: 'Invalid', 
          message: 'image is required',
          buttons:[{
            text:'OK',
            role:'OK'
          }]
      })
        .then(alertEl => {
          alertEl.present();
        });
        return;
      }
      else if(/^[a-zA-Z '\s-]+$/.test(Author) != true){
        this.alertCtrl.create({
          header: 'Invalid', 
          message: 'Please Enter Only Character',
          buttons:[{
            text:'OK',
            role:'OK'
          }]
      })
        .then(alertEl => {
          alertEl.present();
        });
        Author = "";
        return;
      }
      else{
        let collect : User = { id, Title, Description, Image:this.previewUrl, Author};
        this.newArray.push(collect);
        localStorage.setItem('news',(JSON.stringify(this.newArray)));
        this.router.navigate(['show-news']);
        // Image="";
        // Title="";
        // Author="";
        // Description=""
      }

    }
    catch(e){
      console.log('localStorage is Full!');
    }
  }

  //Image Validation
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const file = fileInput.target.files[0];
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      this.alertCtrl.create({
        header: 'Recipe Image Invalid', 
        message: 'Only Image are supported.',
        buttons:[{
          text:'OK',
          role:'OK'
        }]
    })
      .then(alertEl => {
        alertEl.present();
      });
        this.image = null;
        return;
    }
    if(file.size > 1024000){
      this.alertCtrl.create({
        header: 'Invalid Image', 
        message: 'Image must be less then 1MB.',
        buttons:[{
          text:'OK',
          role:'OK'
        }]
    })
      .then(alertEl => {
        alertEl.present();
      });
        this.image = null;
        return;
    }
    this.preview();
  }

  // Show preview 
  preview() {
    var mimeType = this.fileData.type;
    if(mimeType.length <= 102400){
      const reader = new FileReader();      
      reader.readAsDataURL(this.fileData); 
      reader.onload = (_event) => { 
      this.previewUrl = reader.result;
      }
    }
  }
  showNews(){
    if(localStorage.getItem('news')!=null){
      
      this.router.navigate(['show-news']);
    }
    else{
      this.alertCtrl.create({
        header: 'Empty', 
        message: 'There is no news for now',
        buttons:[{
          text:'OK',
          role:'OK'
        }]
    })
      .then(alertEl => {
        alertEl.present();
      });
        return;
    }
  }
}



