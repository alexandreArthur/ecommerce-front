import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor
  (public navCtrl: NavController,
   public navParams: NavParams,
   public localStorage: StorageService,
   public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.localStorage.getLocalUser();
    if(LocalUser && LocalUser.email){
      this.clienteService.findByEmail(LocalUser.email).subscribe(
        response=>{
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
        error=>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      response=>{
        this.cliente.imgUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error=>{}
    );
  }

}
