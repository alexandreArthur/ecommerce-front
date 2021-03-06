import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');

  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response=>{
      this.cliente = response as ClienteDTO;

      this. endereco = this.findEndereco(
        this.pedido.enderecoEntrega.id,
        response['enderecos']); 


    }, error=>{
      this.navCtrl.setRoot('HomePage');
    });


  }
  private findEndereco(id: string, enderecos: EnderecoDTO[]): EnderecoDTO{
    let position = enderecos.findIndex(endereco=> endereco.id == id);
    return enderecos[position];
  }

  total(){
    return this.cartService.total();
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }
  backCat(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response=>{
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location'));
      },
      error=>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location: string): string{
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
