import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import {Cart} from '../models/cart';
import {Products} from '../models/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* on déclare les attributs de classe */
  cart: Cart[] = [];
  cartDatas;

  /* on injecte le service du panier */
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    /* on accède aux données du panier */
    this.cart = this.cartService.cart;
    /* on initialise les données du panier */
    this.cartDatas = this.cartService.cartData;
  }
}
