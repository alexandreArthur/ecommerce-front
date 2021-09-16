import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
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

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public localStorage: StorageService,
    public cartService: CartService) {

  }

  ionViewDidLoad() {
    let LocalUser = this.localStorage.getLocalUser();
    if(LocalUser && LocalUser.email){
      this.clienteService.findByEmail(LocalUser.email).subscribe(
        response=>{
          this.items = response['enderecos'];

          let cart =  this.cartService.getCart();

          this.pedido = {
              cliente: {id: response['id']},
              enderecoEntrega: null,
              pagamento: null,
              itens: cart.items.map(x => {
                return {quantidade: x.quantidade, produto: {id: x.produto.id}}
              })
          }
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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
