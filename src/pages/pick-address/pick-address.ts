import { StorageService } from './../../services/storage.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public localStorage: StorageService) {

  }

  ionViewDidLoad() {
    let LocalUser = this.localStorage.getLocalUser();
    if(LocalUser && LocalUser.email){
      this.clienteService.findByEmail(LocalUser.email).subscribe(
        response=>{
          this.items = response['enderecos'];
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

}
