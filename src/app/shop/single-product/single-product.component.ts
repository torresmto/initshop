import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  /* on défini les attributs de classe  */
  prefUrlImage = `${environment.prefUrlImage}`;
  product: Products;

  /* on passe en paramètre le router et le service sur les produits */
  /* on passe également en paramètre le service pour le panier */
  constructor(private route: ActivatedRoute,
              private prodService: ProductsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    const idParams = this.route.snapshot.params.id;
    this.product = this.prodService.getProductById(idParams);
  }

  /**
   * Méthode permettant d'ajouter un produit au panier
   * @param product Products
   */
  addCart(product: Products): void {
    this.cartService.addProductsToCart(product);
  }

}
