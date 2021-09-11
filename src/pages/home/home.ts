import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO={
    email:"",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public auth: AuthService) {

  }
  ionViewCanEnter(){
   this.menuCtrl.swipeEnable(false);
  }
  ionViewCanLeave(){
   this.menuCtrl.swipeEnable(true);
  }

  login(){
    this.auth.authenticate(this.creds).
    subscribe(response=>{
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{});
  }

}
