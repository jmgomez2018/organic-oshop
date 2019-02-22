import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: any) {
    // console.log('Order to Firebase: ', order);
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart(); // Puede fallar la coneccion con Firebase, se usa Transacciones
                                          // para que se hagan las dos cosas, o son correctas las dos o fallan las dos
    return result;
  }
}