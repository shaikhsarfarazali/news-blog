import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ToastController, AlertController } from '@ionic/angular'
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.page.html',
  styleUrls: ['./show-news.page.scss'],
})
export class ShowNewsPage implements OnInit {

  // add News
  addnews = false;
  
  //hide news
  public show:boolean = false;
  public buttonName:any = 'Show';
  public icon:string;

  // add news details
  title: string;
  description: string;
  image: string;
  author: string;
  counter:number= 1;
  newsDetail : Array<User>;
  id:number;

  //image validation
  fileData:any;
  previewUrl:any;

  // Network Check
  networkChk:boolean=false;

  constructor(
    private dialog: Dialogs,
    public network: Network,
    public toastController:ToastController,
    private alertCtrl:AlertController
    ) { 
      this.network.onDisconnect().subscribe(()=>
      {
        this.networkChk=false;
        this.dialog.alert('network was disconnected: -()')
        });

      this.network.onConnect().subscribe(()=>
      {
        this.networkChk = true;
        setTimeout(()=> 
        {
          this.dialog.alert('we got a ' +this.network.type+ 'connection');
        },2000);
      });
      this.newsDetail = [];
    }

  ngOnInit() {

      this.getnewsDetail();
  }
  
  getnewsDetail(){
      if(localStorage.getItem('allDetails') === null){
        this.newsDetail = [];
      }
      else{
        this.newsDetail = JSON.parse(localStorage.getItem('allDetails'));
      }
  }

  // image validation & upload
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const file = fileInput.target.files[0];
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      this.alertCtrl.create({
        header: 'Image Invalid', 
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

  //preview
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

  //Form Data
  addNews(Title, Description, Image, Author, id=this.counter++){
    try{
        if(/^[a-zA-Z '\s-]+$/.test(Title) != true){
          this.alertCtrl.create({
            header: 'Title Invalid', 
            message: 'Please enter only character',
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
        else if(this.image==null){
          this.alertCtrl.create({
            header: 'Image Is Empty', 
            message: 'Please select an image.',
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
        else{ 
          let collect : User = { id, Title, Description, Image:this.previewUrl, Author};
          this.newsDetail.push(collect);
          this.addnews = false;
          localStorage.setItem('allDetails',(JSON.stringify(this.newsDetail)));
          this.title="";
          this.description=null;
          this.author=null;
          this.show = false;
        }
    }
    catch(e){
      console.log("Local Storage is full, Please empty data");
    }
  }

  // Control form visability
  toggle(){

      this.show = !this.show;

      // CHANGE THE NAME OF THE BUTTON.
      if(this.show)
      {
        this.buttonName = "Hide";
        this.icon = 'eye-off-sharp'
      }
      else{
        this.buttonName = "Add News";
        this.icon = 'eye-sharp'
      }
  }
}
