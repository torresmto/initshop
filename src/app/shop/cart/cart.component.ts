import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Cart} from '../../models/cart';
import {environment} from '../../../environments/environment';
import {Products} from '../../models/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  /* on déclare les attributs de classe */
  cart: Cart[] = [];
  prefUrlImage = `${environment.prefUrlImage}`;

  /* on injecte le service "cart" */
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

  /**
   * Méthode permettant d'ajouter un nouveau produit au panier
   * via le service cartService
   * @param product Products
   */
  addProduct(product: Products): void {
    this.cartService.addProductsToCart(product);
  }

  /**
   * Méthode permettant de supprimer un produit du panier
   * via le service cartService
   * @param product Products
   */
  deleteProduct(product: Products): void {
    this.cartService.deleteFromCart(product);
  }
}
