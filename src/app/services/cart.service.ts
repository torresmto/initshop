import {Injectable} from '@angular/core';
import {Cart} from '../models/cart';
import {Products} from '../models/products';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  /* Déclaration des attributs */
  cart: Cart[] = [];
  cartData = {lengthProducts: 0, cartTotal: 0};

  constructor() { }

  /**
   * Méthode permettant de mettre à jour les données du panier
   */
  updateDatasCart(): void {
    /* on initialise nos variables */
    let lengthProducts = 0;
    let cartTotal = 0;

    /* on doit parcourir tout ce que contient notre panier */
    // tslint:disable-next-line:no-shadowed-variable
    this.cart.forEach(element => {
      /* Pour chaque élément, on vérifie le nombre de fois qu'il est présent dans le panier et on stocke l'info */
      lengthProducts += element.quantity;
      /* On vérifie le prix total du produit au panier et on stocke l'info */
      cartTotal += element.product.price * element.quantity;
    });
    /* on met à jour les données */
    this.cartData.lengthProducts = lengthProducts;
    this.cartData.cartTotal = cartTotal;
  }

  /**
   * Méthode permettant d'ajouter un produit au panier
   * @param addProduct: Products
   */
  addProductsToCart(addProduct: Products): void {
    /* on déclare une constante pour vérifier si le produit existe */
    /* on parcoure le panier avec la méthode "find" */
    /* pour chaque élément, on regarde le produit associé à cet élément */
    /* et on vérifie si cet élément correspond au produit qui est en paramètre et que l'on souhaite ajouter au panier */
    /* si c'est le cas, notre constante contiendra la valeur de "element" */
    // tslint:disable-next-line:no-shadowed-variable
    const checkedProduct = this.cart.find(element => element.product === addProduct);

    /* on vérifie si le produit existe dans le panier */
    if (checkedProduct) {
      /* on incrémente le nombre de fois que nous avons le produit dans le panier */
      checkedProduct.quantity++;
    } else {
      /* on déclare une constante qui contiendra un objet qui contiendra les mêmes attributs que le modèle "cart" */
      const newAddProduct = {
        quantity: 1,
        product: addProduct
      };
      /* on ajoute le nouveau produit au panier */
      this.cart.push(newAddProduct);
    }
    /* on met à jour les données du panier */
    this.updateDatasCart();
  }

  deleteFromCart(deleteProduct: Products): void {
    /* on vérifie le position du produit dans le panier via son index */
    // tslint:disable-next-line:no-shadowed-variable
    const indexProduct = this.cart.findIndex(element => element.product === deleteProduct);
    /* on vérifie si la clé existe */
    if (indexProduct) {
      /* on supprime le produit du panier s'il n'existe qu'une seule fois */
      /* on vérifie l'index du produit dans le panier et on vérifie son attribut "quantity" */
      if (this.cart[indexProduct].quantity > 1) {
        /* on décrémente le nombre de fois que le produit est dans le panier */
        this.cart[indexProduct].quantity--;
      } else {
        /* on supprime le produit du panier */
        this.cart.splice(indexProduct, 1);
      }
    }
    /* on met à jour les données du panier */
    this.updateDatasCart();
  }
}
