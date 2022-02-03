import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  /* On défini les attributs de classe */
  products: Products[] = [];
  prefUrlImage = `${environment.prefUrlImage}`;
  prodSub: Subscription;

  /* on injecte le service du panier */
  constructor(private prodService: ProductsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    /* On récupère la souscription */
    this.prodSub = this.prodService.prodSubject.subscribe(
      /* On écoute les données */
      (data) => {
        this.products = data;
      }
    );
    /* On récupère les données */
    this.prodService.emitProducts();
  }

  ngOnDestroy(): void {
    /* On se désabonne de l'observable */
    this.prodSub.unsubscribe();
  }

  addToCart(product: Products): void {
    /* on utilise le service "cart" pour utiliser la méthode d'ajout au panier */
    this.cartService.addProductsToCart(product);
  }

  deleteToCart(product: Products): void {
    /* on utilise le service "cart" pour utiliser la méthode de suppression du panier */
    this.cartService.deleteFromCart(product);
  }
}
