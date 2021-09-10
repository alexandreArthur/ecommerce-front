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

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }
  ionViewCanEnter(){
   this.menuCtrl.swipeEnable(false);
  }
  ionViewCanLeave(){
   this.menuCtrl.swipeEnable(true);
  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

}
